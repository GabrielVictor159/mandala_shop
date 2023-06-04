import { useEffect, useState } from "react";
import { Categoria } from "../../../model/Categoria";
import { PageableResponseDTO } from "../../../model/DTO/PageableResponseDTO";
import { useNavigate } from "react-router";
import axios from "axios";
import { SystemConfigs } from "../../../config/SystemConfigs";
import { ToastContainer, toast } from "react-toastify";
import DeleteItem from "../../../functions/DeleteItem";
import NavbarAdmin from "../../../components/NavbarAdmin";
import styles from "../../styles/Admin/AdminCategorias.module.scss";
import CustomTable from "../../../components/CustomTable";
export default function AdminCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>();
    const [extraColumns, setExtraColumns] = useState<any>();
    const [atualizacao, setAtualizacao] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("admin") === null) {
            navigate("/")
        }
    }, [])
    useEffect(() => {
        axios.get(`${SystemConfigs.linkBackEnd}Categorias`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setCategorias(response.data)
                console.log(categorias)
            })
            .catch(error => {
                console.error(error);
            });
    }, [atualizacao])
    useEffect(() => {
        setExtraColumns(ExtraColumns());
    }, [categorias])

    const ExtraColumns = () => {
        const a: any = [];
        const z: any = [];
        const x: any = [];
        categorias?.map((value) => {
            z.push(<img style={{ width: "2em", height: "2em", objectFit: 'cover', cursor: 'pointer' }} onClick={() => { navigate(`/Admin/Categorias/${value.id}`) }} src={"/icons8-page-100.png"} />)
        })
        categorias?.map((value) => {
            x.push(<img style={{ width: "2em", height: "2em", objectFit: 'cover', cursor: 'pointer' }} onClick={async () => {
                if (value.id != undefined) {
                    const response = await DeleteItem(value.id, "Categorias")
                    if (response === -2) {
                        toast.error("Admin não logado", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                    else if (response === -1) {
                        toast.error("Houve um erro na requisição", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                    else {
                        setAtualizacao(atualizacao + 1);
                    }
                }
            }} src="/icons8-delete-100.png" />)
        })
        a.push({
            nome: "modificar",
            content: z
        }, {
            nome: "excluir",
            content: x
        });


        return a;
    };
    return (
        <>
            <NavbarAdmin />
            <div className={styles.division1}>
                <div className={styles.containerLista}>
                    <div className={styles.headerContainerLista}>
                        <button onClick={() => { navigate("/Admin/categorias/Adicionar") }}>Adicionar novo item</button>
                    </div>
                    {categorias != undefined ?
                        <CustomTable data={categorias} extraColumns={extraColumns} >

                        </CustomTable>
                        : <></>
                    }

                </div>
            </div>
            <ToastContainer />
        </>
    );
}
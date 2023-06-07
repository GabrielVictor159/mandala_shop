/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PageableResponseDTO } from "../../../model/DTO/PageableResponseDTO";
import axios from "axios";
import { SystemConfigs } from "../../../config/SystemConfigs";
import PageNav from "../../../components/PageNav";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import NavbarAdmin from "../../../components/NavbarAdmin";
import styles from "../../styles/Admin/AdminProdutos.module.scss";
import CustomTable from "../../../components/CustomTable";
import BanirIp from "../../../functions/BanirIp";
export default function AdminPedidos() {
    const [pedidos, setPedidos] = useState<PageableResponseDTO<any>>();
    const [extraColumns, setExtraColumns] = useState<any>();
    const [page, setPage] = useState<number>();
    const [atualizacao, setAtualizacao] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        const a = sessionStorage.getItem("admin");
        if (a == null) {
            navigate("/")
        }
    }, [])
    useEffect(() => {
        let admin: any = sessionStorage.getItem("admin");
        if (admin == null) {
            return
        }
        admin = JSON.parse(admin);
        axios
            .get(`${SystemConfigs.linkBackEnd}Pedidos/${admin.nome}/${admin.senha}`, {
                params: {
                    page: page,
                    tamanhoPagina: 10
                }
            })
            .then(response => {
                const data = response.data;
                data.content.map((_value: any, index: any) => {
                    const ipPersonNotNull: any = {};

                    for (const key in data.content[index].ipPerson) {
                        if (data.content[index].ipPerson[key] !== null) {
                            ipPersonNotNull[key] = data.content[index].ipPerson[key];
                        }
                    }
                    delete ipPersonNotNull.id;
                    data.content[index].ipPerson = JSON.stringify(ipPersonNotNull);
                    const produtosQuantidade: any[] = [];
                    data.content[index].produtos.map((value: any) => {
                        produtosQuantidade.push({
                            nome: value.nome,
                            quantidade: value.quantidade
                        });
                    });
                    data.content[index].produtos = JSON.stringify(produtosQuantidade);
                });

                setPedidos(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [atualizacao]);

    useEffect(() => {
        setExtraColumns(ExtraColumns());
    }, [pedidos])

    const ExtraColumns = () => {
        const a: any = [];
        const z: any = [];
        pedidos?.content.map((value) => {
            z.push(<img style={{ width: "2em", height: "2em", objectFit: 'cover', cursor: 'pointer' }} onClick={() => {
                const data = JSON.parse(value.ipPerson)
                if (data.id != undefined) {
                    BanirIp(data.id)
                }
                setAtualizacao(atualizacao + 1)
            }} src={"/icons8-do-not-touch-your-face-100.png"} />)
        })
        a.push({
            nome: "BanirIp",
            content: z
        });


        return a;
    };
    return (
        <>
            <NavbarAdmin />
            <div className={styles.division1}>
                <div className={styles.containerLista}>
                    <div className={styles.headerContainerLista}>
                        <button onClick={() => { navigate("/Admin/Pedidos/Adicionar") }}>Adicionar novo item</button>
                    </div>
                    {pedidos != undefined && pedidos.content != undefined ?
                        <CustomTable data={pedidos.content} extraColumns={extraColumns} >

                        </CustomTable>
                        : <></>
                    }
                    {pedidos != undefined ?
                        <PageNav setPage={setPage} page={pedidos.pageable.pageNumber + 1} totalPages={pedidos.totalPages} />
                        : <></>
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
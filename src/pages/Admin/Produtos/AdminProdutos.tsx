import { useEffect, useState } from "react";
import { PageableResponseDTO } from "../../../model/DTO/PageableResponseDTO";
import { Produto } from "../../../model/Produto";
import axios from "axios";
import { SystemConfigs } from "../../../config/SystemConfigs";
import { PaginacaoProdutoDTO } from "../../../model/DTO/PaginacaoProdutoDTO";
import PageNav from "../../../components/PageNav";
import { useNavigate } from "react-router";
import DeleteItem from "../../../functions/DeleteItem";
import { ToastContainer, toast } from "react-toastify";
import NavbarAdmin from "../../../components/NavbarAdmin";
import styles from "../../styles/Admin/AdminProdutos.module.scss";
import CustomTable from "../../../components/CustomTable";
export default function AdminProdutos() {
    const [produtos, setProducts] = useState<PageableResponseDTO<Produto>>();
    const [searchProducts, setSearchProducts] = useState<PaginacaoProdutoDTO>(new PaginacaoProdutoDTO());
    const [extraColumns, setExtraColumns] = useState<any>();
    const [atualizacao, setAtualizacao] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("admin") === null) {
            navigate("/")
        }
    }, [])
    useEffect(() => {
        axios.post(`${SystemConfigs.linkBackEnd}Produtos/getAll`, JSON.stringify(searchProducts), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [searchProducts, atualizacao])
    useEffect(() => {
        setExtraColumns(ExtraColumns());
    }, [produtos])
    const setPage = (page: number) => {
        const newSearchProducts = searchProducts;
        newSearchProducts.setPagina(page);
        setSearchProducts(newSearchProducts);
    };
    const ExtraColumns = () => {
        const a: any = [];
        const z: any = [];
        const x: any = [];
        produtos?.content.map((value) => {
            z.push(<img style={{ width: "2em", height: "2em", objectFit: 'cover', cursor: 'pointer' }} onClick={() => { navigate(`/Admin/Produtos/${value.id}`) }} src={"/icons8-page-100.png"} />)
        })
        produtos?.content.map((value) => {
            x.push(<img style={{ width: "2em", height: "2em", objectFit: 'cover', cursor: 'pointer' }} onClick={async () => {
                if (value.id != undefined) {
                    const response = await DeleteItem(value.id, "Produtos")
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
                        <input type="text" placeholder="Nome Busca" onChange={(e) => {
                            const a = searchProducts;
                            a.nome = e.target.value;
                            console.log(a);
                            setSearchProducts(a);
                            setAtualizacao(atualizacao + 1)
                        }} />
                        <button onClick={() => { navigate("/Admin/Produtos/Adicionar") }}>Adicionar novo item</button>
                    </div>
                    {produtos != undefined && produtos.content != undefined ?
                        <CustomTable data={produtos.content} extraColumns={extraColumns} >

                        </CustomTable>
                        : <></>
                    }
                    {produtos != undefined ?
                        <PageNav setPage={setPage} page={produtos.pageable.pageNumber + 1} totalPages={produtos.totalPages} />
                        : <></>
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
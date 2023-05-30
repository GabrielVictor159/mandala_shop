
import { useContext, useEffect, useState } from 'react';
import GenericPage from '../components/GenericPage';
import styles from "./styles/Mensagem.module.scss";
import { produtosContext, selectCategoriaContext } from '../App';
import { useNavigate } from 'react-router';
import { PaginacaoProdutoDTO } from '../model/DTO/PaginacaoProdutoDTO';
import styles2 from "./styles/index.module.scss";
import Produtos from '../components/Produtos';
import { Produto } from '../model/Produto';
import PageNav from '../components/PageNav';
export default function ProdutosCategoria() {
    const { produtos, setProdutos } = useContext(produtosContext);
    const { selectCategoria } = useContext(selectCategoriaContext);
    const [searchProducts, setSearchProducts] = useState<PaginacaoProdutoDTO>(new PaginacaoProdutoDTO());
    const [search, setSearch] = useState<string>("");
    const [atualizacao, setAtualizacao] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (selectCategoria == undefined) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        const a = searchProducts;
        a.categoria = selectCategoria.nome;
        setProdutos(a);
        setAtualizacao(atualizacao + 1);
    }, [searchProducts])

    useEffect(() => {
        const newSearchProducts = searchProducts;
        newSearchProducts.nome = search;
        setProdutos(newSearchProducts);
        setSearchProducts(newSearchProducts);
    }, [search]);
    const setPage = (page: number) => {
        const newSearchProducts = searchProducts;
        newSearchProducts.setPagina(page);
        console.log(newSearchProducts)
        setProdutos(newSearchProducts);
        setSearchProducts(newSearchProducts);
    };
    return (
        <>
            <GenericPage Title={`${selectCategoria.nome}`} setSearch={setSearch} Busca={true}>
                <div className={styles.containerMessage}>
                    <div className={styles.containerProdutos}>
                        {produtos && produtos.content && (
                            produtos.content.map((value: Produto | undefined, index: number) => {
                                return <Produtos key={index} produto={value} />
                            })
                        )}
                    </div>
                    <br /><br /><br />
                    {produtos && produtos.length > 0 ? (
                        <PageNav setPage={setPage} page={produtos.pageable.pageNumber + 1} totalPages={produtos.totalPages} />
                    ) : <></>}

                </div>
                <br /><br /><br /><br /><br /><br /><br />
            </GenericPage>
        </>
    );
}

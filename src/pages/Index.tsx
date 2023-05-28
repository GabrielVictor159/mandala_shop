/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./styles/index.module.scss";
import { historyContext, produtosContext } from "../App";
import { useContext, useEffect, useState } from "react";
import HistoryPagesSet from "../functions/HistoryPagesSet";
import { NavigatePages } from "../model/NavigatePages";
import { Produto } from "../model/Produto";
import Produtos from "../components/Produtos";
import { PaginacaoProdutoDTO } from "../model/DTO/PaginacaoProdutoDTO";
import PageNav from "../components/PageNav";
export default function Index() {
  const { history, setHistory } = useContext(historyContext);
  const { produtos, setProdutos } = useContext(produtosContext);
  const [searchProducts, setSearchProducts] = useState<PaginacaoProdutoDTO>(new PaginacaoProdutoDTO());
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const page = new NavigatePages("Pagina Inicial", window.location.pathname);
    setHistory(HistoryPagesSet(history, page));
    setProdutos(searchProducts)
  }, []);


  useEffect(() => {
    const newSearchProducts = searchProducts;
    newSearchProducts.setNome(search);
    setProdutos(newSearchProducts);
    setSearchProducts(newSearchProducts);
  }, [search]);

  const setPage = (page: number) => {
    const newSearchProducts = searchProducts;
    newSearchProducts.setPagina(page);
    setProdutos(newSearchProducts);
    setSearchProducts(newSearchProducts);
  };

  return (
    <>
      <header>
        <Navbar setSearch={setSearch} />
      </header>
      <div className={styles.division1}>

      </div>
      <br />
      <div className={styles.division2}>
        <h1>
          PRODUTOS
        </h1>
        <br />
        <br /><br /><br />
        <div className={styles.produtosContainer}>
          {produtos && produtos.content && (
            produtos.content.map((value: Produto | undefined, index: number) => {
              return <Produtos key={index} produto={value} />
            })
          )}
        </div>
        <br /><br /><br />
        {produtos && (
          <PageNav setPage={setPage} page={produtos.pageable.pageNumber + 1} totalPages={produtos.totalPages} />
        )}
      </div>
      <br /><br /><br />
      <div className={styles.division3}>
        <h1>
          MANDALA SHOP - A MELHOR TABACARIA DE BRASÍLIA!
        </h1>
      </div>
      <br /><br /><br />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

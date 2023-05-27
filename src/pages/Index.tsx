
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./styles/index.module.scss";
import { historyContext } from "../App";
import { useContext, useEffect, useState } from "react";
import HistoryPagesSet from "../functions/HistoryPagesSet";
import { NavigatePages } from "../model/NavigatePages";
import { Produto } from "../model/Produto";
import Produtos from "../components/Produtos";
export default function Index() {
  const { history, setHistory } = useContext(historyContext);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  useEffect(() => {
    const page = new NavigatePages("Pagina Inicial", window.location.pathname);
    setHistory(HistoryPagesSet(history, page))
  }, []);
  useEffect(() => {
    const listProdutos: Produto[] = [];
    listProdutos.push(
      {
        id: "sdadasdasdas",
        nome: "Carvão coco bass (novo formato)",
        descricao: "fdsfsdfsd",
        preco: 25,
        imagens: "/MulherMandala.png",
        categoria: {
          id: "dasdasdas",
          nome: "categoria de teste",
        },
      },
      {
        id: "sdadasdasdas",
        nome: "Carvão coco bass (novo formato)",
        descricao: "fdsfsdfsd",
        preco: 25,
        imagens: "/MulherMandala.png",
        categoria: {
          id: "dasdasdas",
          nome: "categoria de teste",
        },
      },
      {
        id: "sdadasdasdas",
        nome: "Carvão coco bass (novo formato)",
        descricao: "fdsfsdfsd",
        preco: 25,
        imagens: "/MulherMandala.png",
        categoria: {
          id: "dasdasdas",
          nome: "categoria de teste",
        },
      },
      {
        id: "sdadasdasdas",
        nome: "Carvão coco bass (novo formato)",
        descricao: "fdsfsdfsd",
        preco: 25,
        imagens: "/MulherMandala.png",
        categoria: {
          id: "dasdasdas",
          nome: "categoria de teste",
        },
      },
      {
        id: "sdadasdasdas",
        nome: "Carvão coco bass (novo formato)",
        descricao: "fdsfsdfsd",
        preco: 25,
        imagens: "/MulherMandala.png",
        categoria: {
          id: "dasdasdas",
          nome: "categoria de teste",
        },
      },
      {
        id: "sdadasdasdas",
        nome: "Carvão coco bass (novo formato)",
        descricao: "fdsfsdfsd",
        preco: 25,
        imagens: "/MulherMandala.png",
        categoria: {
          id: "dasdasdas",
          nome: "categoria de teste",
        },
      }
    );
    setProdutos(listProdutos);
  }, [])
  return (
    <>
      <header>
        <Navbar />
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
          {
            produtos.map((value, index) => {
              return (
                <Produtos produto={value} />
              );
            })
          }
        </div>
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

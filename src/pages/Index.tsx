
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./styles/index.module.scss";
import { historyContext } from "../App";
import { useContext, useEffect } from "react";
import HistoryPagesSet from "../functions/HistoryPagesSet";
import { NavigatePages } from "../model/NavigatePages";
export default function Index() {
  const { history, setHistory } = useContext(historyContext);
  useEffect(() => {
    const page = new NavigatePages("Pagina Inicial", window.location.pathname);
    setHistory(HistoryPagesSet(history, page))
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
        <div className={styles.tituloContainer}>
          <h1>
            PRODUTOS
          </h1>
          <br />
        </div>
        <div className={styles.produtosContainer}>

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

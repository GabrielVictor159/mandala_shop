
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./styles/index.module.scss";


export default function Index() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <body>
        <div className={styles.division1}>

        </div>
        <br />
        <div className={styles.division2}>
          <div className={styles.tituloContainer}>
            <h1>
              PRODUTOS
            </h1>
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
      </body>
      <br /><br /><br />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

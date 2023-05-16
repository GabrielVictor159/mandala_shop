
import Navbar from "../components/navbar";
import styles from "./styles/index.module.scss";

export interface IAppProps {
}

export default function Index(){
  return (
    <>
    <header>
      <Navbar active={true}/>
    </header>
    <body>
        <div className={styles.division1}>

        </div>
    </body>
    </>
  );
}

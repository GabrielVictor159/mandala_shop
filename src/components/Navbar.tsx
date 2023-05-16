import * as React from 'react';
import styles from "./styles/navbar.module.scss"; 

export interface NavbarProps {
    active?:Boolean,
}

const Navbar: React.FC<NavbarProps>=({ active = false })=>{
  return (
    <>
    <nav className={styles.nav1}>
      <img src='/icons8-instagram-240.png'/>
      <h1>Fale Conosco</h1>
    </nav>
    <nav className={styles.nav2} style={{height:active?"35vh":"10vh"}}>
        <nav className={styles.subNav1} style={{height:active?"30%":"0%"}}>
            <input type='text' placeholder='Buscar'/>
        </nav>
        <nav className={styles.subNav2} style={{height:active?"70%":"100%"}}>
            <div className={styles.subdivision1}>
                <img src='/MulherMandala.png'/>
            </div>
            <div className={styles.subdivision2}>
            <h3>
                Narguilé
            </h3>
            <h3>
                Charutos
            </h3>
            <h3>
                Ervas
            </h3>
            <h3>
                Carvão
            </h3>
            <img src='/CarrinhoIcon.png'/>
            </div>
        </nav>
    </nav>
    </>
  );
}

export default Navbar;

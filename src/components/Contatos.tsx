import * as React from 'react';
import styles from "./styles/Contatos.module.scss";
export interface ContatosProps {
    setVisible?: any,
}

const Contatos: React.FC<ContatosProps> = ({ setVisible }) => {

    return (
        <>
            <div className={styles.div} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
                <h1>
                    Contato
                </h1>
                <h3>
                    (61) 99664-9494
                </h3>
                <p>Atendimento de segunda à sábado de 10:00 às 21:00 .</p>
                <h1>
                    SIGA-NOS
                </h1>
                <a href="https://www.instagram.com/mandalashopval_/">
                    <img src="/icons8-instagram-240.png" alt="Instagram" />
                    mandalashopval_
                </a>
            </div>
        </>
    );
}

export default Contatos;
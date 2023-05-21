import * as React from 'react';
import styles from "./styles/Footer.module.scss";
import { useNavigate, useLocation } from 'react-router-dom';
export interface FooterProps {
    active?: boolean,
}

const Footer: React.FC = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <nav className={styles.nav1}>
                <div style={{ borderRight: "5px solid white" }}>
                    <img src='/MulherMandala.png' />
                    <h3>
                        Somos uma tabacaria com foco principal no mundo
                        do Arguile! Porém não paramos por aí, trabalhamos
                        com produtos de Head Shop, Tereré e seus periféricos!
                    </h3>
                </div>
                <div >
                    <div className={styles.pages}>
                        <h2 onClick={() => navigate("/PoliticaDePrivacidade")}>
                            Política de Privacidade
                        </h2>
                        <h2 onClick={() => navigate("/EnvioPagamentoMensagem")}>
                            Envio e Pagamento
                        </h2>
                    </div>
                    <div className={styles.dados}>
                        <ul>
                            <li>
                                Brasil Center Shopping ( Loja 41 Bloco azul).
                            </li>
                            <li>
                                Segunda à Sábado 10:00 às 22:00.
                            </li>
                            <h4>
                                @mandalashopval_
                            </h4>
                            <h4>
                                (61) 99664-9494
                            </h4>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className={styles.nav2}>
                <h1>
                    Mandala Shop - Loja de Arguiles, Head Shop e Tereré.
                </h1>
            </nav>
        </>
    );
}

export default Footer;

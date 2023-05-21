import * as React from 'react';
import styles from "./styles/navbar.module.scss";
import Contatos from './Contatos';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export interface NavbarProps {
    active?: boolean,
}

const Navbar: React.FC<NavbarProps> = ({ active = true }) => {
    const [isContatosVisible, setIsContatosVisible] = useState(false);
    const [mouseHover, setMouseHover] = useState(false);
    const [contatosHover, setContatosHover] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (mouseHover) {
            setIsContatosVisible(true);
        }
        if (!mouseHover && !contatosHover) {
            setTimeout(() => {
                setIsContatosVisible(false)
            }, 3000)
        }
    }, [mouseHover, contatosHover])


    return (
        <>
            {isContatosVisible && <Contatos setVisible={setContatosHover} />}
            <nav className={styles.nav1}>
                <a href="https://www.instagram.com/mandalashopval_/">
                    <img src="/icons8-instagram-240.png" alt="Instagram" />
                </a>
                <div onMouseOver={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)}>
                    <h1>Fale Conosco</h1>
                </div>

            </nav>
            <nav className={styles.nav2} >
                <nav className={styles.subNav1} >
                    {active ?
                        <input type='text' placeholder='Buscar' />
                        : <></>}
                </nav>
                <nav className={styles.subNav2} >
                    <div className={styles.subdivision1}>
                        <img src='/MulherMandala.png' onClick={() => navigate("/")} />
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
                        <img src='/CarrinhoIcon.png' />
                    </div>
                </nav>
            </nav>
        </>
    );
}

export default Navbar;

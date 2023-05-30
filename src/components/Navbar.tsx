import React, { useState } from 'react';
import styles from "./styles/navbar.module.scss";
import Contatos from './Contatos';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Categoria } from '../model/Categoria';
import { categoriasContext, selectCategoriaContext } from '../App';

export interface NavbarProps {
    active?: boolean,
    setSearch?: (page: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ active = true, setSearch }) => {
    const { categorias, setCategorias } = useContext(categoriasContext);
    const [isContatosVisible, setIsContatosVisible] = useState(false);
    const [mouseHover, setMouseHover] = useState(false);
    const [contatosHover, setContatosHover] = useState(false);
    const [categoriasNavWidth, setCategoriasNavWidth] = useState(0);
    const { selectCategoria, setSelectCategoria } = useContext(selectCategoriaContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (mouseHover) {
            setIsContatosVisible(true);
        }
        if (!mouseHover && !contatosHover) {
            setTimeout(() => {
                setIsContatosVisible(false);
            }, 3000);
        }
    }, [mouseHover, contatosHover]);

    const handleClick = () => {
        if (categoriasNavWidth === 0) {
            // Aumentar a largura da classe .categoriasNav
            setCategoriasNavWidth(350);
        } else {
            // Reduzir a largura da classe .categoriasNav
            setCategoriasNavWidth(0);
        }
    };

    return (
        <>
            {categorias.length <= 5 ? (
                <div className={styles.categoriasNav} style={{ width: categoriasNavWidth }}>
                    <img src="/icons8-x-100.png" className={styles.closeIcon} onClick={handleClick} />
                    <br />
                    <h1>
                        CATEGORIAS
                    </h1>
                    {
                        categorias && categorias.map((value: Categoria) => <h3 onClick={() => { setSelectCategoria(value); navigate("/ProdutosCategoria") }}>
                            <span>{value.nome}</span>
                        </h3>)
                    }

                </div>
            ) : (
                <>
                </>
            )}
            {isContatosVisible && <Contatos setVisible={setContatosHover} />}
            <nav className={styles.nav1}>
                <a href="https://www.instagram.com/mandalashopval_/">
                    <img src="/icons8-instagram-240.png" alt="Instagram" />
                </a>
                <div onMouseOver={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)}>
                    <h1>Fale Conosco</h1>
                </div>
            </nav>
            <nav className={styles.nav2}>
                <nav className={styles.subNav1}>
                    {active ? <input type='text' placeholder='Buscar' onChange={(value) => { setSearch ? setSearch(value.target.value) : "" }} /> : <></>}
                </nav>
                <nav className={styles.subNav2}>
                    <div className={styles.subdivision1}>
                        <img src='/MulherMandala.png' onClick={() => navigate("/")} />
                    </div>
                    <div className={styles.subdivision2}>
                        {categorias.length >= 5 ? (
                            <>
                                {categorias && categorias.map((value: Categoria) => <h3 onClick={() => { setSelectCategoria(value); navigate("/ProdutosCategoria") }}>{value.nome}</h3>)}
                                <img src='/CarrinhoIcon.png' />
                            </>
                        ) : (
                            <>
                                <img src='/CarrinhoIcon.png' />
                                <img src={'/icons8-menu-100.png'} style={{ width: '3em' }} onClick={handleClick} />
                            </>
                        )}
                    </div>
                </nav>
            </nav>
        </>
    );
}

export default Navbar;

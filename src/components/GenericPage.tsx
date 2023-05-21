import * as React from 'react';
import styles from "./styles/GenericPage.module.scss";
import { ReactNode, useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { NavigatePages } from '../model/NavigatePages';
import HistoryPagesSet from '../functions/HistoryPagesSet';
import { historyContext } from "../App";
export interface GenericPageProps {
    children?: ReactNode,
    Title?: string,
    Busca?: boolean
}

const GenericPage: React.FC<GenericPageProps> = ({ children, Title = "pagina sem nome", Busca = false }) => {
    const navigate = useNavigate();
    const { history, setHistory } = useContext(historyContext);
    const [atualizar, setAtualizar] = useState(0);
    useEffect(() => {
        const page = new NavigatePages(Title, window.location.pathname);
        setHistory(HistoryPagesSet(history, page))
        setAtualizar(atualizar + 1)
    }, [])
    return (
        <>
            <header>
                <Navbar active={Busca} />
            </header>
            <br />
            <br />
            <div className={styles.pageDivision}>
                <div className={styles.pageContainer}>
                    {history.map((element: NavigatePages, index: number) => (
                        <React.Fragment key={element.nome}>
                            <a onClick={() => navigate(element.link)}>
                                <h4>{element.nome}</h4>
                            </a>
                            {index !== history.length - 1 && <h3>{">"}</h3>}
                        </React.Fragment>
                    ))}


                </div>
            </div>
            <br />
            <br />
            <div className={styles.titleDivision}>
                <h1>{Title}</h1>
            </div>
            <div className={styles.division1}>
                {children}
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default GenericPage;

import { useContext } from "react";
import { SystemConfigs } from "../config/SystemConfigs";
import { Categoria } from "../model/Categoria";
import styles from "./styles/CategoriasMenu.module.scss";
import { selectCategoriaContext } from "../App";
import { useNavigate } from "react-router";
export interface CategoriasMenuProps {
    categorias: Categoria[]
}

const CategoriasMenu: React.FC<CategoriasMenuProps> = ({ categorias }) => {
    const { selectCategoria, setSelectCategoria } = useContext(selectCategoriaContext);
    const navigate = useNavigate();
    return (
        <>

            <div className={styles.containerMenu}>
                <h1>
                    NOSSOS PRODUTOS
                </h1>
                <div className={styles.subMenu}>
                    {
                        categorias[0] != undefined
                            ?
                            <>
                                <img className={styles.image1} src={`${SystemConfigs.linkBackEnd}/images/${categorias[0].imagem}`} onClick={() => { setSelectCategoria(categorias[0]); navigate("/ProdutosCategoria") }} />
                                {
                                    categorias[1] != undefined
                                        ?

                                        <div className={styles.subMenuDivision1}>
                                            <div className={styles.containerItem2} onClick={() => { setSelectCategoria(categorias[1]); navigate("/ProdutosCategoria") }}>
                                                <img src={`${SystemConfigs.linkBackEnd}/images/${categorias[1].imagem}`} />
                                                <h2>
                                                    {categorias[1].nome}
                                                </h2>
                                            </div>
                                            {
                                                categorias[2] != undefined
                                                    ? <div className={styles.subMenuDivision2}>
                                                        <div className={styles.containerItem3} onClick={() => { setSelectCategoria(categorias[2]); navigate("/ProdutosCategoria") }}>
                                                            <img src={`${SystemConfigs.linkBackEnd}/images/${categorias[2].imagem}`} />
                                                            <h2>
                                                                <span>
                                                                    {categorias[2].nome}
                                                                </span>
                                                            </h2>
                                                        </div>
                                                        {
                                                            categorias[3] != undefined
                                                                ? <div className={styles.containerItem3} onClick={() => { setSelectCategoria(categorias[3]); navigate("/ProdutosCategoria") }}>
                                                                    <img src={`${SystemConfigs.linkBackEnd}/images/${categorias[3].imagem}`} />
                                                                    <h2>
                                                                        {categorias[3].nome}
                                                                    </h2>
                                                                </div>
                                                                : <></>
                                                        }
                                                    </div>
                                                    : <></>
                                            }
                                        </div>
                                        : <></>
                                }
                            </>
                            : <></>
                    }
                </div>
            </div>
        </>
    );
}

export default CategoriasMenu;
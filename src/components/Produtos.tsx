import * as React from 'react';
import styles from "./styles/Produtos.module.scss";
import { Produto } from '../model/Produto';

export interface ProdutosProps {
    vertical?: boolean,
    produto?: Produto
}

const Produtos: React.FC<ProdutosProps> = ({ vertical = false, produto }) => {
    return (
        <>
            {vertical
                ?
                <div className={styles.div1}>
                    <h3>{produto?.nome}</h3>
                    <div className={styles.containerImage}>
                        <img className={styles.image} src={produto?.imagens} />
                    </div>
                    <h3>{`R$ ${produto?.preco}`}</h3>
                    <button className={styles.button}>MAIS INFORMMAÇÕES</button>
                </div>
                :
                <div className={styles.div2}>
                    <div className={styles.containerImage}>
                        <img className={styles.image} src={produto?.imagens ?? "/MulherMandala.png"} />
                    </div>
                    <div className={styles.containerDados}>
                        <h3>{produto?.nome}</h3>
                        <h2 className={styles.precoEscrita}>{`R$ ${produto?.preco}`}</h2>
                        <button className={styles.button}>MAIS INFORMAÇÕES</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Produtos;
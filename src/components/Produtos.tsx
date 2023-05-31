import * as React from 'react';
import styles from "./styles/Produtos.module.scss";
import { Produto } from '../model/Produto';
import { useEffect, useState } from 'react';
import ArrayStringToArray from '../functions/ArrayStringToArray';
import { SystemConfigs } from '../config/SystemConfigs';
import { useNavigate } from 'react-router';

export interface ProdutosProps {
    vertical?: boolean,
    produto?: Produto
}

const Produtos: React.FC<ProdutosProps> = ({ vertical = false, produto }) => {
    const [images, setImages] = useState<string[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (produto?.imagens) {
            setImages(ArrayStringToArray(produto.imagens));
        } else {
            setImages([]);
        }
    }, [produto]);

    return (
        <>
            {vertical
                ?
                <div className={styles.div1}>
                    <h3>{produto?.nome}</h3>
                    <div className={styles.containerImage}>
                        <img
                            className={styles.image}
                            src={images[0] ? `${SystemConfigs.linkBackEnd}images/${images[0]}` : "/MulherMandala.png"}
                            alt="Imagem do produto"
                        />
                    </div>
                    <h3>{`R$ ${produto?.preco}`}</h3>
                    <button className={styles.button}>MAIS INFORMMAÇÕES</button>
                </div>
                :
                <div className={styles.div2}>
                    <div className={styles.containerImage}>
                        <img
                            className={styles.image}
                            src={images[0] ? `${SystemConfigs.linkBackEnd}images/${images[0]}` : "/MulherMandala.png"}
                            alt="Imagem do produto"
                        />
                    </div>
                    <div className={styles.containerDados}>
                        <h3>{produto?.nome}</h3>
                        <h2 className={styles.precoEscrita}>{`R$ ${produto?.preco}`}</h2>
                        <button className={styles.button} onClick={() => { navigate(`/Produto/${produto?.id}`) }}>MAIS INFORMAÇÕES</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Produtos;
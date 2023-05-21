import * as React from 'react';
import styles from "./styles/Produtos.module.scss";

export interface ProdutosProps {
    vertical?: boolean,
}

const Produtos: React.FC<ProdutosProps> = ({ vertical = false }) => {
    return (
        <>
            {vertical
                ?
                <></>
                :
                <div className={styles.div}>

                </div>
            }
        </>
    );
}

export default Produtos;
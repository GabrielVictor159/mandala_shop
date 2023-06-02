/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import GenericPage from '../components/GenericPage';
import styles from "./styles/ProdutoView.module.scss";
import { useEffect, useState } from 'react';
import { Produto } from '../model/Produto';
import { SystemConfigs } from '../config/SystemConfigs';
import axios from 'axios';
import ArrayStringToArray from '../functions/ArrayStringToArray';
import { ListProducts } from '../model/ListProducts';
export default function ProdutoView() {
    const { id } = useParams();
    const [produto, setProduto] = useState<Produto>();
    const [images, setImages] = useState<string[]>();
    const [selectImage, setSelectImage] = useState<string>();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${SystemConfigs.linkBackEnd}Produtos/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setProduto(response.data)
            })
            .catch(error => {
                console.error(error);
                navigate("/");
            });
    }, [id])
    useEffect(() => {
        if (produto?.imagens !== undefined) {
            setImages(ArrayStringToArray(produto.imagens));
        }
    }, [produto]);

    const setCarrinho = () => {
        if (produto?.id !== undefined) {
            const produtoQuantidade = new ListProducts(produto, 1);
            const a = sessionStorage.getItem("carrinho");

            if (a === null) {
                const z = [produtoQuantidade];
                sessionStorage.setItem("carrinho", JSON.stringify(z));
                navigate("/");
            } else {
                const z = JSON.parse(a);
                const itemBusca = z.find((item: any) => item.Id === produtoQuantidade.produto);

                if (itemBusca) {
                    itemBusca.quantidade = itemBusca.quantidade + 1;
                } else {
                    z.push(produtoQuantidade);
                }

                sessionStorage.setItem("carrinho", JSON.stringify(z));
                navigate("/");
            }
        }
    };


    return (
        <>
            {
                produto != undefined
                    ?
                    <GenericPage Title={produto?.nome}>
                        <div className={styles.container}>
                            <div className={styles.containerImages}>
                                {
                                    images !== undefined
                                        ?
                                        <>
                                            {images.map((value) => {
                                                return (
                                                    <img alt={"/MulherMandala.png"} src={`${SystemConfigs.linkBackEnd}images/${value}`} onClick={() => { setSelectImage(value) }} />
                                                );
                                            })}
                                        </>
                                        : <></>
                                }
                            </div>
                            <img className={styles.ImageView} alt={"/MulherMandala.png"} src={selectImage === undefined ? images === undefined ? "" : `${SystemConfigs.linkBackEnd}images/${images[0]}` : `${SystemConfigs.linkBackEnd}images/${selectImage}`} />
                            <div className={styles.containerDescricao}>
                                <h1>
                                    {produto?.nome}
                                </h1>
                                <h3>
                                    {produto?.descricao}
                                </h3>
                                <h1>
                                    {produto?.preco}
                                </h1>
                                <button className={styles.button} onClick={() => { setCarrinho() }}>Adicionar ao carrinho</button>
                            </div>
                        </div>
                        <br /><br /><br /><br /><br /><br /><br />
                    </GenericPage>
                    : <></>
            }
        </>
    );
}
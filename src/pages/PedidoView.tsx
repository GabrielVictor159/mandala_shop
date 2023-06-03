import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { SystemConfigs } from "../config/SystemConfigs";
import styles from "./styles/PedidoView.module.scss";
import ArrayStringToArray from "../functions/ArrayStringToArray";
export default function PedidoView() {
    const { id } = useParams();
    const [pedido, setPedido] = useState<any>();
    const [sizeProportion, setSizeProportion] = useState<number>(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        const a = windowWidth / windowHeight;
        console.log(a);
        setSizeProportion(a);
    }, [windowHeight, windowWidth])
    useEffect(() => {
        axios.get(`${SystemConfigs.linkBackEnd}Pedidos/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setPedido(response.data)
                    console.log(response.data)
                }
                else {
                    navigate("/")
                }
            })
            .catch(error => {
                navigate("/")
                console.error(error);
            });
    }, [id])


    return (
        <>
            <header>
                <Navbar active={false} />
            </header>
            <div className={styles.division} style={{ flexDirection: sizeProportion > 1.4 ? "row" : "column", alignItems: sizeProportion > 1.4 ? "flex-start" : "center" }}>
                <div className={styles.container1}>
                    <h1>{"Obrigado pela preferência, seu pedido está sendo preparado e logo sairá para a entrega!"}</h1>
                    <br /><br /><br /><br /><br />
                    <div style={{ width: '100%', height: "3px", backgroundColor: "black" }} />
                    <br /><br /><br />
                    <div className={styles.containerProdutos}>
                        <h1>Resumo do pedido</h1>
                        {
                            pedido !== undefined && pedido.produtos !== undefined
                                ?
                                <>
                                    {pedido.produtos.map((value: any) => {
                                        const a = ArrayStringToArray(value.imagens);
                                        return (
                                            <div key={value.id}>
                                                <img src={`${SystemConfigs.linkBackEnd}images/${a[0]}`} />
                                                <div>
                                                    <h2>{value.nome}</h2>
                                                </div>

                                                <h4>{`R$ ${value.preco}`}</h4>
                                            </div>
                                        );
                                    })}
                                </>
                                : <></>
                        }
                    </div>
                </div>
                <div className={styles.container2}>
                    <div className={styles.containerDadosPedido}>
                        <h4>
                            <strong>#</strong> do seu pedido:
                        </h4>
                        <h2>
                            {pedido != undefined && pedido.id != undefined ?
                                pedido.id
                                : ""}
                        </h2>
                        <h3>Forma de pagamento</h3>
                        <div >
                            {
                                pedido != undefined && pedido.metodoPagamento != undefined
                                    ?
                                    <>
                                        {
                                            pedido.metodoPagamento === "CARTAO"
                                                ? <img src="/icons8-card-80.png" />
                                                : pedido.metodoPagamento === "PIX"
                                                    ? <img src="/icons8-pix-90.png" />
                                                    : pedido.metodoPagamento === "DINHEIRO"
                                                        ? <img src="/icons8-money-96.png" />
                                                        : <></>
                                        }
                                    </>
                                    : <></>
                            }
                            {pedido != undefined && pedido.valorTotal != undefined
                                ?
                                <h5>{`Total: R$ ${pedido.valorTotal}`}</h5>
                                : <></>
                            }
                        </div>
                        <br /><br />
                        <button onClick={() => { navigate("/") }}>Realizar uma nova compra</button>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ListProducts } from "../model/ListProducts";
import { useNavigate } from "react-router";
import { historyContext } from "../App";
import HistoryPagesSet from "../functions/HistoryPagesSet";
import { NavigatePages } from "../model/NavigatePages";
import styles from "./styles/CarrinhoDeCompra.module.scss";
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SystemConfigs } from "../config/SystemConfigs";
import ArrayStringToArray from "../functions/ArrayStringToArray";
import { PedidoDTO } from "../model/DTO/PedidoDTO";
import { PaymentMethods } from "../model/enum/PaymentMethods";
import { ListProductsDTO } from "../model/DTO/ListProductsDTO";
import axios from "axios";
export default function CarrinhoDeCompra() {
    const storedCarrinho = sessionStorage.getItem("carrinho")
    const [carrinho, setCarrinho] = useState<ListProducts[]>(
        storedCarrinho !== null
            ? JSON.parse(storedCarrinho)
            : []
    );
    const storedPersonalInformation = sessionStorage.getItem("personalInformation");
    const [personalInformation, setPersonalInformation] = useState<any>(
        storedPersonalInformation !== null
            ? JSON.parse(storedPersonalInformation)
            : null
    );
    const storedEnderecoInformation = sessionStorage.getItem("enderecoInformation");
    const [enderecoInformation, setEnderecoInformation] = useState<any>(
        storedEnderecoInformation !== null
            ? JSON.parse(storedEnderecoInformation)
            : null
    );
    const [view1, setView1] = useState<boolean>(personalInformation === null ? true : false);
    const [view2, setView2] = useState<boolean>(enderecoInformation === null ? true : false);
    const [view3, setView3] = useState<boolean>(!view1 && !view2 && personalInformation != null && enderecoInformation != null ? true : false);
    const [firstName, setFirstName] = useState<string>(personalInformation != null ? personalInformation.primeiroNome : "");
    const [lastName, setLastName] = useState<string>(personalInformation != null ? personalInformation.ultimoNome : "");
    const [cpf, setCpf] = useState<string>(personalInformation != null ? personalInformation.cpf : "");
    const [telefone, setTelefone] = useState<string>(personalInformation != null ? personalInformation.telefone : "");
    const [cep, setCep] = useState<string>(enderecoInformation != null ? enderecoInformation.cep : "");
    const [numeroCasa, setNumeroCasa] = useState<string>(enderecoInformation != null ? enderecoInformation.numeroCasa : "");
    const { history, setHistory } = useContext(historyContext);
    const [paymentMethod1, setPaymentMethod1] = useState<boolean>(false);
    const [paymentMethod2, setPaymentMethod2] = useState<boolean>(false);
    const [paymentMethod3, setPaymentMethod3] = useState<boolean>(false);
    const [sizeProportion, setSizeProportion] = useState<number>(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [atualizacao, setAtualizacao] = useState<number>(0);
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [obsevation, setObservation] = useState<string>("");

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
        let z = 0;
        carrinho.map((value) => {
            if (value.produto.preco != undefined && value.quantidade) {
                z += value.produto.preco * value.quantidade;
            }
        })
        setValorTotal(z);
    }, [carrinho])
    useEffect(() => {
        const a = windowWidth / windowHeight;
        console.log(a);
        setSizeProportion(a);
    }, [windowHeight, windowWidth])
    const navigate = useNavigate();
    useEffect(() => {
        if (storedCarrinho == null || carrinho.length === 0) {
            navigate("/")
        }
    }, [carrinho, storedCarrinho])
    useEffect(() => {
        const page = new NavigatePages("Carrinho de compra", window.location.pathname);
        setHistory(HistoryPagesSet(history, page));
    }, []);

    const personalInformationSet = () => {
        const newCpf = removeSpecialCharactersAndNonNumericDigits(cpf);
        const newTelefone = removeSpecialCharactersAndNonNumericDigits(telefone);
        if (firstName === "" || lastName === "" || newCpf === "" || newTelefone === "") {
            toast.error("insira todas as suas informações pessoais!", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (newCpf.length !== 11) {
            toast.error("Por favor o cpf deve ter 11 dígitos!", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        else if (newTelefone.length !== 11) {
            toast.error("Por favor o telefone deve ter 11 dígitos!", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        else {
            const a: any = {};
            a.primeiroNome = firstName;
            a.ultimoNome = lastName;
            a.cpf = cpf;
            a.telefone = telefone;
            setPersonalInformation(a)
            setView1(false);
            setView2(true);
            setView3(false)
            sessionStorage.setItem("personalInformation", JSON.stringify(a));
        }
    }
    const enderecoInformationSet = () => {
        const newCep = removeSpecialCharactersAndNonNumericDigits(cep);
        if (newCep === "" || numeroCasa === "") {
            toast.error("insira todas as informações sobre o endereço!", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (newCep.length != 8) {
            toast.error("Por favor o cep deve ter 8 dígitos!", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        else {
            const a: any = {};
            a.cep = cep;
            a.numeroCasa = numeroCasa;
            setEnderecoInformation(a);
            setView1(false);
            setView2(false);
            setView3(true)
            sessionStorage.setItem("enderecoInformation", JSON.stringify(a));
        }
    }
    function removeSpecialCharactersAndNonNumericDigits(str: string): string {
        const regex = /[^0-9a-zA-Z]+/g;
        return str.replace(regex, '');
    }
    const finishOrder = () => {
        const payment = paymentMethod1 ? PaymentMethods.CARTAO.toString() : paymentMethod2 ? PaymentMethods.DINHEIRO.toString() : paymentMethod3 ? PaymentMethods.PIX.toString() : "";
        if (payment === "") {
            toast.error("Por favor selecione uma forma de pagamento!", {
                position: toast.POSITION.TOP_CENTER
            })
            return
        }
        const produtos: ListProductsDTO[] = [];
        carrinho.map((value) => {
            if (value.produto.id != undefined && value.quantidade != undefined) {
                produtos.push(new ListProductsDTO(value.produto.id, value.quantidade))
            }
        })
        const z: PedidoDTO = new PedidoDTO(
            personalInformation.primeiroNome,
            personalInformation.ultimoNome,
            removeSpecialCharactersAndNonNumericDigits(personalInformation.cpf),
            removeSpecialCharactersAndNonNumericDigits(enderecoInformation.cep),
            enderecoInformation.numeroCasa,
            removeSpecialCharactersAndNonNumericDigits(personalInformation.telefone),
            payment,
            obsevation,
            produtos
        );
        fetch(`${SystemConfigs.linkBackEnd}Pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(z)
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json().then(data => {
                        sessionStorage.removeItem("carrinho");
                        navigate(`/Pedido/${data.id}`)
                    });
                } else {
                    return response.text().then(data => {
                        const errorMessage = data || 'Erro desconhecido';
                        toast.error(errorMessage, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    });
                }
            })
            .catch(error => {
                console.error(error.message);
            });

    }
    const PersonalInformationComponente = () => {
        if (view1) {
            return (
                <div className={styles.dadosActive} style={{ height: view1 ? "40em" : "8em" }}>
                    <h1 className={styles.titleActive}>
                        <div>1</div>
                        Informações Pessoais
                    </h1>
                    <div className={styles.labelDiv}>
                        <label htmlFor="primeiroNome">Primeiro Nome</label>
                    </div>
                    <input
                        type="text"
                        id="primeiroNome"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        placeholder={firstName}
                    />

                    <div className={styles.labelDiv}>
                        <label htmlFor="ultimoNome">Ultimo Nome</label>
                    </div>
                    <input
                        type="text"
                        id="ultimoNome"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        placeholder={lastName}
                    />

                    <div className={styles.labelDiv}>
                        <label htmlFor="cpf">CPF</label>
                    </div>
                    <InputMask
                        mask="999.999.999-99"
                        id="cpf"
                        onChange={(e) => {
                            setCpf(e.target.value);
                        }}
                        placeholder={cpf}
                    />

                    <div className={styles.labelDiv}>
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                    <InputMask
                        mask="(99) 99999-9999"
                        id="telefone"
                        onChange={(e) => {
                            setTelefone(e.target.value);
                        }}
                        placeholder={telefone}
                    />
                    <button onClick={() => personalInformationSet()}>Salvar dados</button>
                </div>
            );
        } else {
            return (
                <div className={styles.dadosActive} style={{ height: view1 ? "40em" : "8em" }}>
                    <div className={styles.containerTitle}>
                        <h1 className={styles.titleInactive}>
                            <div>1</div>
                            Informações Pessoais
                        </h1>
                        <a
                            onClick={() => {
                                setView1(true);
                                setView2(false);
                                setView3(false);
                            }}
                        >
                            Editar
                        </a>
                    </div>
                    <label>
                        Bem vindo ({personalInformation.primeiroNome} {personalInformation.ultimoNome})!
                    </label>
                </div>
            );
        }
    };
    return (
        <>
            <header>
                <Navbar active={false} />
            </header>
            <div className={styles.division} style={{ flexDirection: sizeProportion < 1.4 ? "column" : "row" }}>
                {sizeProportion > 1.4 ?
                    <td>
                        {PersonalInformationComponente()}
                    </td>
                    : <></>}
                <td>
                    {sizeProportion < 1.4 ?
                        <>
                            {PersonalInformationComponente()}
                            <br />
                        </>
                        : <></>}
                    <div className={styles.dadosActive} style={{ height: view1 ? "11em" : view2 ? "25em" : "11em" }}>
                        {
                            view1
                                ?
                                <>
                                    <h1 className={styles.titleActive}>
                                        <div>2</div>
                                        {"Endereço de entrega"}
                                    </h1>
                                    <label>Finalize o passo anterior para continuar</label>
                                </>
                                :
                                view2 ?
                                    <>
                                        <h1 className={styles.titleActive}>
                                            <div>2</div>
                                            {"Endereço de entrega"}
                                        </h1>
                                        <div className={styles.labelDiv}>
                                            <label htmlFor="cep">CEP</label>
                                        </div>
                                        <InputMask
                                            mask="99999-999"
                                            id="cep"
                                            onChange={e => { setCep(e.target.value) }}
                                            placeholder={cep}
                                        />
                                        <div className={styles.labelDiv}>
                                            <label htmlFor="numeroCasa">Numero</label>
                                        </div>
                                        <input type="number" id="numeroCasa" min={0} onChange={e => { setNumeroCasa(e.target.value) }}
                                            placeholder={numeroCasa} />
                                        <button onClick={() => { enderecoInformationSet() }}>Salvar dados</button>
                                    </>
                                    :
                                    <>
                                        <div className={styles.containerTitle}>
                                            <h1 className={styles.titleInactive}>
                                                <div>2</div>
                                                {"Endereço de entrega"}
                                            </h1>
                                            <a onClick={() => {
                                                setView1(false);
                                                setView2(true);
                                                setView3(false);
                                            }}>Editar</a>
                                        </div>
                                        <label>
                                            {`CEP: ${enderecoInformation.cep}!`}
                                        </label>
                                        <label>
                                            {`Numero: ${enderecoInformation.numeroCasa}!`}
                                        </label>
                                    </>
                        }
                    </div>
                    <br />
                    <div className={styles.dadosActive} style={{ gap: '1em', height: !view3 ? "8em" : "30em" }}>
                        {
                            !view3 ?
                                <>
                                    <h1 className={styles.titleActive}>
                                        <div>3</div>
                                        {"Forma de pagamento"}
                                    </h1>
                                    <label>Finalize o passo anterior para continuar</label>
                                </>
                                :
                                <>
                                    <h1 className={styles.titleActive}>
                                        <div>3</div>
                                        {"Forma de pagamento"}
                                    </h1>
                                    <label>Selecione uma forma de pagamento para finalizar seu pedido.</label>
                                    <div className={!paymentMethod1 ? styles.buttonMethodPaymentInactive : styles.buttonMethodPaymentActive}
                                        onClick={() => {
                                            setPaymentMethod1(!paymentMethod1);
                                            setPaymentMethod2(false);
                                            setPaymentMethod3(false);
                                        }}>
                                        <div className={styles.textIconContainer}>
                                            <img src="/icons8-card-80.png" />
                                            <h4>
                                                {"Cartão de Crédito/Débito"}
                                            </h4>
                                        </div>
                                        <label>{"à vista"}</label>
                                    </div>
                                    <div className={!paymentMethod2 ? styles.buttonMethodPaymentInactive : styles.buttonMethodPaymentActive}
                                        onClick={() => {
                                            setPaymentMethod1(false);
                                            setPaymentMethod2(!paymentMethod2);
                                            setPaymentMethod3(false);
                                        }}>
                                        <div className={styles.textIconContainer}>
                                            <img src="/icons8-pix-90.png" />
                                            <h4>
                                                {"Pix"}
                                            </h4>
                                        </div>
                                        <label>{"à vista"}</label>
                                    </div>
                                    <div className={!paymentMethod3 ? styles.buttonMethodPaymentInactive : styles.buttonMethodPaymentActive}
                                        onClick={() => {
                                            setPaymentMethod1(false);
                                            setPaymentMethod2(false);
                                            setPaymentMethod3(!paymentMethod3);
                                        }}>
                                        <div className={styles.textIconContainer}>
                                            <img src="/icons8-money-96.png" />
                                            <h4>
                                                {"Dinheiro ( Real )"}
                                            </h4>
                                        </div>
                                        <label>{"à vista"}</label>
                                        <label className={styles.textEspecialButtonMethodPayment}>{"Informar valor nas OBSERVAÇÕES caso necessite de troco."}</label>
                                    </div>
                                    <button onClick={() => { finishOrder() }}>Finalizar Pedido</button>
                                </>
                        }
                    </div>
                </td>
                <td className={styles.containerProdutos}>
                    <h2>
                        Resumo do pedido
                    </h2>
                    {carrinho.length > 0 ?
                        carrinho.map((value, Index) => {
                            const a = ArrayStringToArray(value.produto.imagens);
                            const subTotal = value.produto.preco !== undefined && value.quantidade !== undefined ? value.produto.preco * value.quantidade : 0;
                            return (
                                <div key={value.produto.nome}>
                                    <div className={styles.containerProduto}>
                                        <img src={`${SystemConfigs.linkBackEnd}images/${a[0]}`} />
                                        <div className={styles.descricaoProduto}>
                                            <h3>{value.produto.nome}</h3>
                                            <div className={styles.containerQuantidadeProduto}>
                                                <div>
                                                    {
                                                        value.quantidade === 1
                                                            ? <img src={"/icons8-trash-128.png"}
                                                                onClick={() => {
                                                                    const z = carrinho;
                                                                    z.splice(Index, 1);
                                                                    setCarrinho(z);
                                                                    sessionStorage.setItem("carrinho", JSON.stringify(z))
                                                                    setAtualizacao(atualizacao + 1)
                                                                }} />
                                                            : <img src={"/icons8-minus-96.png"}
                                                                onClick={() => {
                                                                    const z = carrinho;
                                                                    z[Index].quantidade = z[Index].quantidade - 1;
                                                                    setCarrinho(z);
                                                                    sessionStorage.setItem("carrinho", JSON.stringify(z))
                                                                    setAtualizacao(atualizacao + 1)
                                                                }} />
                                                    }
                                                    <h1>{value.quantidade}</h1>
                                                    <img src={"/icons8-plus-math-90.png"}
                                                        onClick={() => {
                                                            const z = carrinho;
                                                            z[Index].quantidade = z[Index].quantidade + 1;
                                                            setCarrinho(z);
                                                            sessionStorage.setItem("carrinho", JSON.stringify(z))
                                                            setAtualizacao(atualizacao + 1)
                                                        }} />
                                                </div>
                                                <h3>
                                                    {subTotal}
                                                </h3>
                                            </div>

                                        </div>

                                    </div>
                                    <br /><br />


                                </div>
                            )
                        })

                        : <></>
                    }
                    <h3>{"Observações"}</h3>
                    <textarea
                        placeholder="Adicione informações relacionadas ao seu pedido."
                        onChange={e => { setObservation(e.target.value) }}
                    />
                    <br />
                    <br />
                    <div style={{ width: "104%", height: "2px", backgroundColor: "#AEAEAE" }} />
                    <div className={styles.containerPrecos}>
                        <div>
                            <h3>
                                {`TOTAL DO PEDIDO`}
                            </h3>
                            <h3>
                                {`R$${valorTotal}`}
                            </h3>
                        </div>

                    </div>
                </td>

            </div>
            <footer>
                <Footer />
            </footer>
            <ToastContainer />

        </>
    );
}
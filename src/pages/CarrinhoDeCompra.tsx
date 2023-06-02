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
export default function CarrinhoDeCompra() {
    const [carrinho, setCarrinho] = useState<ListProducts[] | any>(sessionStorage.getItem("carrinho"));
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
    const [firstName, setFirstName] = useState<string>(personalInformation.primeiroNome);
    const [lastName, setLastName] = useState<string>(personalInformation.ultimoNome);
    const [cpf, setCpf] = useState<string>(personalInformation.cpf);
    const [telefone, setTelefone] = useState<string>(personalInformation.telefone);
    const [cep, setCep] = useState<string>(enderecoInformation.cep);
    const [numeroCasa, setNumeroCasa] = useState<string>(enderecoInformation.numeroCasa);
    const { history, setHistory } = useContext(historyContext);
    const [paymentMethod1, setPaymentMethod1] = useState(false);
    const [paymentMethod2, setPaymentMethod2] = useState(false);
    const [paymentMethod3, setPaymentMethod3] = useState(false);
    const [sizeProportion, setSizeProportion] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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
        const a = windowWidth - windowHeight;
        console.log(a);
        setSizeProportion(a);
    }, [windowHeight, windowWidth])
    const navigate = useNavigate();
    useEffect(() => {
        if (carrinho == null) {
            navigate("/")
        }
    }, [])
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
            <div className={styles.division} style={{ flexDirection: sizeProportion < 0 ? "column" : "row" }}>
                {sizeProportion > 0 ?
                    <td>
                        {PersonalInformationComponente()}
                    </td>
                    : <></>}
                <td>
                    {sizeProportion < 0 ?
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
                                    <button>Finalizar Pedido</button>
                                </>
                        }
                    </div>
                </td>
                <td>

                </td>

            </div>
            <footer>
                <Footer />
            </footer>
            <ToastContainer />

        </>
    );
}
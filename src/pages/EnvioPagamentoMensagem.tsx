
import GenericPage from '../components/GenericPage';
import styles from "./styles/Mensagem.module.scss";
export default function EnvioPagamentoMensagem() {
    return (
        <>
            <GenericPage Title='Envio e Pagamento'>
                <div className={styles.containerMessage}>
                    <ul>
                        <li>
                            Os pedidos realizados em nosso site são despachados em até 03 dias úteis.
                        </li>
                        <br />
                        <li>
                            O pagamento poderá ser feito em cartão (débito ou crédito), pix, ou dinheiro.
                        </li>
                    </ul>
                </div>
            </GenericPage>
        </>
    );
}

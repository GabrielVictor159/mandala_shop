
import GenericPage from '../components/GenericPage';
import styles from "./styles/Mensagem.module.scss";
export default function PoliticaPrivacidade() {
    return (
        <>
            <GenericPage Title='Política de privacidade'>
                <div className={styles.containerMessage}>
                    <ul>
                        <li>
                            Bem-vindo à plataforma Mandala Shop, os Serviços oferecidos e fornecidos pela Mandala Shop incluem um serviço de plataforma online que fornece venda de mercadorias.  Você deve ter no mínimo 18 anos de idade para realizar ou buscar esses serviços.
                        </li>
                    </ul>
                </div>
            </GenericPage>
        </>
    );
}
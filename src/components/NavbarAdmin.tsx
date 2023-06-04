import { useNavigate } from "react-router";
import styles from "./styles/NavbarAdmin.module.scss";

const NavbarAdmin: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className={styles.nav}>
                <h1 onClick={() => { navigate("/Admin/Produtos") }}>Produtos</h1>
                <h1 onClick={() => { navigate("/Admin/Categorias") }}>Categorias</h1>
                <h1 onClick={() => { navigate("/Admin/Pedidos") }}>Pedidos</h1>
            </nav>
        </>
    );
}

export default NavbarAdmin;
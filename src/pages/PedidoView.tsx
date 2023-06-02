import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PedidoView() {
    const { id } = useParams();
    return (
        <>
            <header>
                <Navbar active={false} />
            </header>
            <h1>{id}</h1>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
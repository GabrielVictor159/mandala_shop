import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import handleImageChange from "../../../functions/handleImageChange";
import { useNavigate } from "react-router";
import { SystemConfigs } from "../../../config/SystemConfigs";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import styles from "../../styles/Admin/AdminCategoriasAdicionar.module.scss";
export default function CategoriaForm() {
    const [nome, setNome] = useState<string>("");
    const [imagens, setImagens] = useState<string[]>();
    const adminSearch = sessionStorage.getItem("admin");
    const [admin, setAdmin] = useState(adminSearch != null ? JSON.parse(adminSearch) : null);
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("admin") === null) {
            navigate("/")
        }
    }, []);

    const handleSubmit = async () => {
        const dto = {
            nome,
            imagem: imagens
        };
        try {
            const response = await axios.post(
                `${SystemConfigs.linkBackEnd}Categorias/${admin.nome}/${admin.senha}`,
                dto,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status == 200) {
                navigate("/Admin/Produtos");
            }
            else {
                toast.error(response.data, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleImagesChange = async (event: ChangeEvent<HTMLInputElement>) => {
        await handleImageChange(event, setImagens);
    }
    return (
        <>
            <div className={styles.division}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </label>
                <label>
                    Imagens:
                    <input
                        type="file"
                        multiple
                        onChange={handleImagesChange}
                    />
                </label>
                <button onClick={async () => { await handleSubmit() }}>Enviar</button>
            </div>
            <ToastContainer />
        </>
    );
}
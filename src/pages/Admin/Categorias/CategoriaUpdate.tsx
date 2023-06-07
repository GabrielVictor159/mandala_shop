/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SystemConfigs } from "../../../config/SystemConfigs";
import { Categoria } from "../../../model/Categoria";
import styles from "../../styles/Admin/AdminCategoriaUpdate.module.scss";
import ImageRequestBlob from "../../../functions/ImageRequestBlob";
import handleImageChange from "../../../functions/handleImageChange";
import { ToastContainer, toast } from "react-toastify";
import NavbarAdmin from "../../../components/NavbarAdmin";

export default function CategoriaUpdate() {
    const { id } = useParams();
    const [categoria, setCategoria] = useState<Categoria>();
    const adminSearch = sessionStorage.getItem("admin");
    const [admin] = useState(adminSearch != null ? JSON.parse(adminSearch) : null);
    const [nomeInput, setNomeInput] = useState<string>();
    const [imageInput, setImageInput] = useState<string>();
    const [atualizar, setAtualizar] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("admin") === null) {
            navigate("/")
        }
    }, []);
    useEffect(() => {
        axios.get(`${SystemConfigs.linkBackEnd}Categorias/${id}`)
            .then(async (response) => {
                setCategoria(response.data);
                setNomeInput(response.data.nome);
                setImageInput(await ImageRequestBlob(response.data.imagem));
            })
            .catch(() => {
                navigate(-1);
            })
    }, [id, atualizar])
    const handleImagesChange = async (event: ChangeEvent<HTMLInputElement>) => {
        await handleImageChange(event, setImageInput);
    }
    const submit = () => {

        const dto = {
            nome: nomeInput,
            imagem: imageInput
        };
        console.log(JSON.stringify(dto))
        axios.put(`${SystemConfigs.linkBackEnd}Categorias/${id}/${admin.nome}/${admin.senha}`,
            dto, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                setAtualizar(atualizar + 1);
            })
            .catch((error) => {
                toast.error(error.data, {
                    position: toast.POSITION.TOP_CENTER
                });
            })

    }
    return (
        <>
            <NavbarAdmin />
            <div className={styles.division}>
                <img src={`${SystemConfigs.linkBackEnd}images/${categoria?.imagem}`} />
                <h3>{categoria?.nome}</h3>
                <br /><br /><br /><br />
                <label>
                    Novo nome
                    <input type="text" onChange={(e) => { setNomeInput(e.target.value) }} />
                </label>
                <label>
                    Image:
                    <input
                        type="file"
                        onChange={handleImagesChange}
                    />
                </label>
                <button onClick={() => { submit() }}>Enviar</button>
            </div>
            <ToastContainer />
        </>
    );
}
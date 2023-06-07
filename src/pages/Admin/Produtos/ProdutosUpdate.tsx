import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Produto } from "../../../model/Produto";
import axios from "axios";
import { SystemConfigs } from "../../../config/SystemConfigs";
import ArrayStringToArray from "../../../functions/ArrayStringToArray";
import stylesProdutoView from "../../styles/ProdutoView.module.scss";
import styles from "../../styles/Admin/AdminProdutosUpdate.module.scss";
import { Categoria } from "../../../model/Categoria";
import handleImagensChangeMultiple from "../../../functions/handleImagensChangeMultiple";
import { ToastContainer, toast } from "react-toastify";
import ImageRequestBlob from "../../../functions/ImageRequestBlob";
import NavbarAdmin from "../../../components/NavbarAdmin";
export default function ProdutosUpdate() {
    const { id } = useParams();
    const [produto, setProduto] = useState<Produto>();
    const [images, setImages] = useState<string[]>();
    const [imagesBlob, setImagesBlob] = useState<string[]>();
    const [selectImage, setSelectImage] = useState<string>();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState<number>();
    const [imagens, setImagens] = useState<string[]>([]);
    const [idCategoria, setIdCategoria] = useState('');
    const adminSearch = sessionStorage.getItem("admin");
    const [admin, setAdmin] = useState(adminSearch != null ? JSON.parse(adminSearch) : null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [atualizar, setAtualizar] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("admin") === null) {
            navigate("/")
        }
    }, []);
    useEffect(() => {
        const a: string[] = []
        images?.map(async (value) => {
            a.push(await ImageRequestBlob(value));
        })
        setImagesBlob(a);
    }, [images])
    useEffect(() => {
        axios.get(`${SystemConfigs.linkBackEnd}Produtos/${id}`)
            .then((response) => {
                setProduto(response.data)
            })
            .catch(() => {
                navigate(-1);
            })
    }, [id, atualizar]);
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get<Categoria[]>(`${SystemConfigs.linkBackEnd}Categorias`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setCategorias(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        if (produto?.imagens !== undefined) {
            setImages(ArrayStringToArray(produto.imagens));
        }
    }, [produto]);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const produtoDTO = {
            nome: nome.length === 0 ? produto?.nome : nome,
            descricao: descricao.length === 0 ? produto?.descricao : descricao,
            preco: preco === undefined ? produto?.preco : preco,
            imagens: imagens.length === 0 ? imagesBlob : imagens,
            idCategoria: idCategoria.length === 0 ? produto?.categoria?.id : idCategoria,
        };
        console.log(JSON.stringify(produtoDTO))
        try {
            const response = await axios.put(
                `${SystemConfigs.linkBackEnd}Produtos/${id}/${admin.nome}/${admin.senha}`,
                produtoDTO,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status == 200) {
                setAtualizar(atualizar + 1);
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
    const handleImagensChange = async (event: ChangeEvent<HTMLInputElement>) => {
        await handleImagensChangeMultiple(event, setImagens);
    };
    return (
        <>
            <NavbarAdmin />
            <div className={styles.division}>
                <div className={styles.containerImages}>
                    <div className={styles.containerImages2}>
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
                </div>
                <br /> <br /> <br />
                <h3>{`Nome: ${produto?.nome}`}</h3>
                <h3>{`Descrição: ${produto?.descricao}`}</h3>
                <h3>{`Categoria: ${produto?.categoria?.nome}`}</h3>
                <h3>{`Preço: ${produto?.preco}`}</h3>
                <br />
                <form onSubmit={handleSubmit} >
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Descrição:
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Preço:
                        <input
                            type="number"
                            value={preco}
                            onChange={(e) => setPreco(parseFloat(e.target.value))}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Imagens:
                        <input
                            type="file"
                            multiple
                            onChange={handleImagensChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Categoria:
                        <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <br />
                    <button type="submit">Enviar</button>
                    <br />
                    <br />
                    <br />
                </form>
                <ToastContainer />

            </div>
        </>
    );
}
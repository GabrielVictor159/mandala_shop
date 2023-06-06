import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { SystemConfigs } from '../../../config/SystemConfigs';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import styles from "../../styles/Admin/AdminProdutosAdicionar.module.scss";
import handleImagensChangeMultiple from '../../../functions/handleImagensChangeMultiple';
interface Categoria {
    id: string;
    nome: string;
    imagem?: string;
}

const ProdutoForm: React.FC = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const [imagens, setImagens] = useState<string[]>([]);
    const [idCategoria, setIdCategoria] = useState('');
    const adminSearch = sessionStorage.getItem("admin");
    const [admin, setAdmin] = useState(adminSearch != null ? JSON.parse(adminSearch) : null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin == null) {
            navigate("/")
        }
    }, [admin])

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const produtoDTO = {
            nome,
            descricao,
            preco,
            imagens: imagens,
            idCategoria,
        };
        console.log(JSON.stringify(produtoDTO))
        try {
            const response = await axios.post(
                `${SystemConfigs.linkBackEnd}Produtos/${admin.nome}/${admin.senha}`,
                produtoDTO,
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
    const handleImagensChange = async (event: ChangeEvent<HTMLInputElement>) => {
        await handleImagensChangeMultiple(event, setImagens);
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={styles.division}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </label>
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
                <label>
                    Preço:
                    <input
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(parseFloat(e.target.value))}
                    />
                </label>
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
                <button type="submit">Enviar</button>
            </form>
            <ToastContainer />
        </>
    );
};

export default ProdutoForm;

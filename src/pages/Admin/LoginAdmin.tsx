import axios from "axios";
import { useState } from "react";
import { SystemConfigs } from "../../config/SystemConfigs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function LoginAdmin() {
    const [Nome, setNome] = useState<string>("");
    const [Senha, setSenha] = useState<string>("");
    const navigate = useNavigate();
    const logar = () => {
        axios.get(`${SystemConfigs.linkBackEnd}Admins/${Nome}/${Senha}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const data = response.data;
                data.senha = Senha;
                data.nome = Nome;
                sessionStorage.setItem("admin", JSON.stringify(data));
                navigate("/Admin/Produtos")
            })
            .catch(() => {
                toast.error("Nome ou senha errados", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }
    return (
        <>
            <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <label htmlFor="inputNomeAdmin">Nome</label>
                <input type="text" id="inputNomeAdmin" onChange={(e) => { setNome(encodeURIComponent(btoa(e.target.value))) }} />
                <br /><br />
                <label htmlFor="inputSenhaAdmin">Senha</label>
                <input type="password" id="inputSenhaAdmin" onChange={(e) => { setSenha(encodeURIComponent(btoa(e.target.value))) }} />
                <br />
                <button onClick={() => { logar() }}>Logar</button>
            </div>
            <ToastContainer />
        </>
    );
}
import axios from "axios";
import { SystemConfigs } from "../config/SystemConfigs";

export default async function BanirIp(id: string) {
    let admin: any = sessionStorage.getItem("admin");
    if (admin == null) {
        return -2;
    }
    admin = JSON.parse(admin);

    try {
        const response = await axios.put(`${SystemConfigs.linkBackEnd}Pedidos/BanirIp/${id}/${admin.nome}/${admin.senha}`);
        return response.status;
    } catch (error) {
        return -1;
    }
}

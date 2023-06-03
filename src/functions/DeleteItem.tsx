import axios from "axios";
import { SystemConfigs } from "../config/SystemConfigs";

export default async function DeleteItem(id: string, stringTypeName: string) {
    let admin: any = sessionStorage.getItem("admin");
    if (admin == null) {
        return -2;
    }
    admin = JSON.parse(admin);

    try {
        const response = await axios.delete(`${SystemConfigs.linkBackEnd}${stringTypeName}/${id}/${admin.nome}/${admin.senha}`);
        return response.status;
    } catch (error) {
        return -1;
    }
}

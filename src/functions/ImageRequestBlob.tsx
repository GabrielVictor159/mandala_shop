import { SystemConfigs } from "../config/SystemConfigs";

export default async function ImageRequestBlob(name: string): Promise<string> {
    if (name !== undefined) {
        try {
            console.log(`${SystemConfigs.linkBackEnd}images/${name}`)
            const response = await fetch(`${SystemConfigs.linkBackEnd}images/${name}`);
            const blob = await response.blob();

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result?.toString().split(",")[1] || "";
                    resolve(base64String);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.log(error)
            return "";
        }
    }
    else {
        return "";
    }
}

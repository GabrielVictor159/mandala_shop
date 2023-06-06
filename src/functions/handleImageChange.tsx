import { ChangeEvent } from "react";

const handleImagensChange = async (event: ChangeEvent<HTMLInputElement>, setImagens: any) => {
    if (event.target.files != null) {
        const file = event.target.files[0];
        if (file) {
            const base64String = await convertFileToBase64String(file);
            setImagens(base64String);
        }
    }
};

const convertFileToBase64String = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result?.toString().split(",")[1] || "";
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default handleImagensChange;

import { ChangeEvent } from "react";

const handleImagensChange = async (event: ChangeEvent<HTMLInputElement>, setImagens: any) => {
    const files = event.target.files;

    if (files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = async (e: any) => {
                const uri = e.target.result; // Obtém a URI do arquivo

                try {
                    const response = await fetch(uri);
                    const blob = await response.blob(); // Converte a resposta em um Blob

                    const base64String = await convertBlobToBase64String(blob); // Converte o Blob em uma string base64

                    // Adiciona a string base64 ao array de imagens
                    setImagens((prevImagens: any) => [...prevImagens, base64String]);
                } catch (error) {
                    // Trate qualquer erro que ocorra durante a requisição fetch
                    console.error('Erro ao fazer a requisição fetch:', error);
                }
            };

            reader.readAsDataURL(file);
        }
    }
};
export default handleImagensChange;

const convertBlobToBase64String = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(',')[1] || '';
            resolve(base64String);
        };

        reader.onerror = reject;

        reader.readAsDataURL(blob);
    });
};
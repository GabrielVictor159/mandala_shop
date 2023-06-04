import React, { ChangeEvent, useState } from 'react';

interface ImageUploaderProps {
    imageBlobs: Blob[];
    setImageBlobs: React.Dispatch<React.SetStateAction<Blob[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    imageBlobs,
    setImageBlobs,
}) => {
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const blobs: Blob[] = [];

        if (files) {
            // Converter os arquivos de imagem em blobs
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(files[i]);

                reader.onload = () => {
                    const result = reader.result;
                    if (result instanceof ArrayBuffer) {
                        const blob = new Blob([new Uint8Array(result)]);
                        blobs.push(blob);

                        if (blobs.length === files.length) {
                            setImageBlobs((prevImageBlobs) => [...prevImageBlobs, ...blobs]);
                        }
                    }
                };
            }
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleImageUpload} />
            <div>
                {imageBlobs.map((blob, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(blob)}
                        alt={`Image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;

export default function ArrayStringToArray(mensagem: string | undefined): string[] {
    if (mensagem === undefined) {
        return [];
    }
    const trimmedStr = mensagem.slice(1, -1);
    const arr = trimmedStr.split(", ");
    return arr;
}
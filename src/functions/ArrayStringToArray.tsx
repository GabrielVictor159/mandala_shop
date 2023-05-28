export default function ArrayStringToArray(mensagem: string): string[] {
    const trimmedStr = mensagem.slice(1, -1);
    const arr = trimmedStr.split(", ");
    return arr;
}
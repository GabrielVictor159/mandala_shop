import { Produto } from "./Produto";

export class ListProducts {
    public produto: Produto;
    public quantidade: number;
    constructor(produto: Produto, quantidade: number) {
        this.produto = produto;
        this.quantidade = quantidade;
    }
}
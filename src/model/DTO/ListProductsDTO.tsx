
export class ListProductsDTO {
    public id: string;
    public quantidade: number;
    constructor(id: string, quantidade: number) {
        this.id = id;
        this.quantidade = quantidade;
    }
}
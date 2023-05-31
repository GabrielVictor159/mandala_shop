export class ListProducts {
    public Id: string;
    public Quantidade: number;
    constructor(id: string, quantidade: number) {
        this.Id = id;
        this.Quantidade = quantidade;
    }
}
export class Categoria {
    id?: string;
    nome?: string;

    constructor(options: {
        id?: string;
        nome?: string;
    } = {}) {
        this.id = options.id;
        this.nome = options.nome;
    }
}

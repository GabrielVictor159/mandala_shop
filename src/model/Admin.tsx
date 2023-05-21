export class Admin {
    id?: string;
    nome?: string;
    senha?: string;
    tipo?: string;

    constructor(options: {
        id?: string;
        nome?: string;
        senha?: string;
        tipo?: string;
    } = {}) {
        this.id = options.id;
        this.nome = options.nome;
        this.senha = options.senha;
        this.tipo = options.tipo;
    }
}

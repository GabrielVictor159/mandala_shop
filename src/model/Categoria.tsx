export class Categoria {
    id?: string;
    nome?: string;
    imagem?: string;

    constructor(options: {
        id?: string;
        nome?: string;
        imagem?: string;
    } = {}) {
        this.id = options.id;
        this.nome = options.nome;
        this.imagem = options.imagem
    }
}

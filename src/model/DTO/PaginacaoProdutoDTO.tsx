export class PaginacaoProdutoDTO {
    private nome?: string;
    private categoria?: string;
    private precoMinimo = -1;
    private precoMaximo = -1;
    private descricao?: string;
    private pagina = 1;
    private tamanhoPagina = 10;

    constructor(
        nome?: string,
        categoria?: string,
        precoMinimo = -1,
        precoMaximo = -1,
        descricao?: string,
        pagina = 1,
        tamanhoPagina = 10
    ) {
        this.nome = nome;
        this.categoria = categoria;
        this.precoMinimo = precoMinimo;
        this.precoMaximo = precoMaximo;
        this.descricao = descricao;
        this.pagina = pagina;
        this.tamanhoPagina = tamanhoPagina;
    }

    getNome(): string | undefined {
        return this.nome;
    }

    setNome(value: string | undefined) {
        this.nome = value;
    }

    getCategoria(): string | undefined {
        return this.categoria;
    }

    setCategoria(value: string | undefined) {
        this.categoria = value;
    }

    getPrecoMinimo(): number {
        return this.precoMinimo;
    }

    setPrecoMinimo(value: number) {
        this.precoMinimo = value;
    }

    getPrecoMaximo(): number {
        return this.precoMaximo;
    }

    setPrecoMaximo(value: number) {
        this.precoMaximo = value;
    }

    getDescricao(): string | undefined {
        return this.descricao;
    }

    setDescricao(value: string | undefined) {
        this.descricao = value;
    }

    getPagina(): number {
        return this.pagina;
    }

    setPagina(value: number) {
        this.pagina = value;
    }

    getTamanhoPagina(): number {
        return this.tamanhoPagina;
    }

    setTamanhoPagina(value: number) {
        this.tamanhoPagina = value;
    }
}

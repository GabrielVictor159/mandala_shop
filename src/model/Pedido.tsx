import { IpPerson } from "./IpPerson";

export class Pedido {
    id?: string;
    primeiroNome?: string;
    ultimoNome?: string;
    cpf?: number;
    cep?: string;
    numeroCasa?: number;
    telefone?: string;
    dataCriacao?: Date;
    ipPerson?: IpPerson;

    constructor(options: {
        id?: string;
        primeiroNome?: string;
        ultimoNome?: string;
        cpf?: number;
        cep?: string;
        numeroCasa?: number;
        telefone?: string;
        dataCriacao?: Date;
        ipPerson?: IpPerson;
    } = {}) {
        this.id = options.id;
        this.primeiroNome = options.primeiroNome;
        this.ultimoNome = options.ultimoNome;
        this.cpf = options.cpf;
        this.cep = options.cep;
        this.numeroCasa = options.numeroCasa;
        this.telefone = options.telefone;
        this.dataCriacao = options.dataCriacao;
        this.ipPerson = options.ipPerson;
    }
}

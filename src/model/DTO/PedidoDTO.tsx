import { ListProducts } from "../ListProducts";
import { PaymentMethods } from "../enum/PaymentMethods";
export class PedidoDTO {
    primeiroNome: string;
    ultimoNome: string;
    cpf: string;
    cep: string;
    numeroCasa: number;
    telefone: string;
    metodoPagamento: PaymentMethods;
    observacoes?: string;
    produtos?: ListProducts[];

    constructor(
        primeiroNome: string,
        ultimoNome: string,
        cpf: string,
        cep: string,
        numeroCasa: number,
        telefone: string,
        metodoPagamento: PaymentMethods,
        observacoes?: string,
        produtos?: ListProducts[]
    ) {
        this.primeiroNome = primeiroNome;
        this.ultimoNome = ultimoNome;
        this.cpf = cpf;
        this.cep = cep;
        this.numeroCasa = numeroCasa;
        this.telefone = telefone;
        this.metodoPagamento = metodoPagamento;
        this.observacoes = observacoes;
        this.produtos = produtos;
    }
}
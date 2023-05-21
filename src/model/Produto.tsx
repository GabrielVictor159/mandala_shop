import { Categoria } from "./Categoria";

export class Produto {
  id?: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  imagens?: string;
  categoria?: Categoria;

  constructor(options: {
    id?: string;
    nome?: string;
    descricao?: string;
    preco?: number;
    imagens?: string;
    categoria?: Categoria;
  } = {}) {
    this.id = options.id;
    this.nome = options.nome;
    this.descricao = options.descricao;
    this.preco = options.preco;
    this.imagens = options.imagens;
    this.categoria = options.categoria;
  }
}

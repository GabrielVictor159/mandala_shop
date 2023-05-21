import { Categoria } from "./Categoria";

export class Produto {
  id: string | undefined;
  nome: string | undefined;
  descricao: string | undefined;
  preco: number | undefined;
  imagens: string | undefined;
  categoria: Categoria | undefined;
}
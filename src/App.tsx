/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { Route, Routes, useNavigate } from 'react-router'
import Index from './pages/Index'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade'
import { NavigatePages } from './model/NavigatePages';
import { createContext, useEffect, useState } from 'react';
import EnvioPagamentoMensagem from './pages/EnvioPagamentoMensagem';
import { PageableResponseDTO } from './model/DTO/PageableResponseDTO';
import { Produto } from './model/Produto';
import { PaginacaoProdutoDTO } from './model/DTO/PaginacaoProdutoDTO';
import axios from 'axios';
import { SystemConfigs } from './config/SystemConfigs';
import { Categoria } from './model/Categoria';
import ProdutosCategoria from './pages/ProdutosCategoria';
import ProdutoView from './pages/ProdutoView';
import CarrinhoDeCompra from './pages/CarrinhoDeCompra';
import PedidoView from './pages/PedidoView';
import LoginAdmin from './pages/Admin/LoginAdmin';

export const historyContext = createContext<any>(null);
export const produtosContext = createContext<any>(null);
export const categoriasContext = createContext<any>(null);
export const selectCategoriaContext = createContext<any>(null);
function App() {
  const [history, setHistory] = useState<NavigatePages[]>([]);
  const [produtos, setProducts] = useState<PageableResponseDTO<Produto>>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectCategoria, setSelectCategoria] = useState<Categoria>();
  const navigate = useNavigate();
  const setProdutos = (searchProducts: PaginacaoProdutoDTO) => {
    console.log(JSON.stringify(searchProducts));
    axios.post(`${SystemConfigs.linkBackEnd}Produtos/getAll`, JSON.stringify(searchProducts), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(() => {
    axios.get(`${SystemConfigs.linkBackEnd}Categorias`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setCategorias(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [])
  return (
    <>
      <historyContext.Provider value={{ history, setHistory }}>
        <produtosContext.Provider value={{ produtos, setProdutos }}>
          <categoriasContext.Provider value={{ categorias, setCategorias }}>
            <selectCategoriaContext.Provider value={{ selectCategoria, setSelectCategoria }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path='/PoliticaDePrivacidade' element={<PoliticaPrivacidade />} />
                <Route path='/CarrinhoDeCompra' element={<CarrinhoDeCompra />} />
                <Route path='/Produto/:id' element={<ProdutoView />} />
                <Route path='/Pedido/:id' element={<PedidoView />} />
                <Route path='/Admin' element={<LoginAdmin />} />
                <Route path='/EnvioPagamentoMensagem' element={<EnvioPagamentoMensagem />} />
                {selectCategoria != undefined ?
                  <Route path='/ProdutosCategoria' element={<ProdutosCategoria />} />
                  : <></>
                }
              </Routes>
            </selectCategoriaContext.Provider>
          </categoriasContext.Provider>
        </produtosContext.Provider>
      </historyContext.Provider>

    </>
  )
}

export default App

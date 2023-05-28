/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { Route, Routes } from 'react-router'
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

export const historyContext = createContext<any>(null);
export const produtosContext = createContext<any>(null);
function App() {
  const [history, setHistory] = useState<NavigatePages[]>([]);
  const [produtos, setProducts] = useState<PageableResponseDTO<Produto>>();

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
  return (
    <>
      <historyContext.Provider value={{ history, setHistory }}>
        <produtosContext.Provider value={{ produtos, setProdutos }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path='/PoliticaDePrivacidade' element={<PoliticaPrivacidade />} />
            <Route path='/EnvioPagamentoMensagem' element={<EnvioPagamentoMensagem />} />
          </Routes>
        </produtosContext.Provider>
      </historyContext.Provider>
    </>
  )
}

export default App

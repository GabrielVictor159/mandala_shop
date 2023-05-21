
import { Route, Routes } from 'react-router'
import Index from './pages/Index'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade'
import { NavigatePages } from './model/NavigatePages';
import { createContext, useState } from 'react';
import EnvioPagamentoMensagem from './pages/EnvioPagamentoMensagem';

export const historyContext = createContext<any>(null);
function App() {
  const [history, setHistory] = useState<NavigatePages[]>([]);
  return (
    <>
      <historyContext.Provider value={{ history, setHistory }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path='/PoliticaDePrivacidade' element={<PoliticaPrivacidade />} />
          <Route path='/EnvioPagamentoMensagem' element={<EnvioPagamentoMensagem />} />
        </Routes>
      </historyContext.Provider>
    </>
  )
}

export default App

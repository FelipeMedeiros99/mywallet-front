import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import "./assets/reset.css"
import "./assets/index.css"

import { Contexto } from "./Contexto"
import Login from "./Components/Login"
import { useState } from "react"
import Cadastro from "./Components/Cadastro"
import Home from "./Components/Home"
import AdicionarEntrada from "./Components/AdicionarEntrada"
import AdicionarSaida from "./Components/AdicionarSaida"
import EditarTransacao from "./Components/EditarTransacao"

// https://mywallet-back-p4xq.onrender.com

// TODO: LIMPAR E MELHORAR O CÓDIGO

function App(){
  const [dadosUsuario, setDadosUsuario] = useState({})
  const [tokenUsuario, setTokenUsuario] = useState('')
  const [editarTransacao, setEditarTransacao] = useState({})
  console.log(dadosUsuario)
  return(
    <Contexto.Provider value={{dadosUsuario, setDadosUsuario, tokenUsuario, setTokenUsuario, editarTransacao, setEditarTransacao}}>
      <Router>        
        <Routes>
          <Route path="/" element={<Login />}/> 
          <Route path="/cadastro" element={<Cadastro/>} />  
          <Route path="/home" element={<Home/>} />
          <Route path="/nova-entrada" element={<AdicionarEntrada/>} />
          <Route path="nova-saida" element={<AdicionarSaida/>} />
          <Route path="editar-transacao" element={<EditarTransacao/>} />
          
        </Routes>
      </Router>
    </Contexto.Provider>
  )
}

createRoot(document.querySelector(".root")).render(<App></App>)
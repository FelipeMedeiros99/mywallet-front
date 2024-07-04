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

// https://mywallet-back-p4xq.onrender.com

function App(){
  const [dadosUsuario, setDadosUsuario] = useState({})
  const [tokenUsuario, setTokenUsuario] = useState('')
  console.log(dadosUsuario)
  return(
    <Contexto.Provider value={{dadosUsuario, setDadosUsuario, tokenUsuario, setTokenUsuario}}>
      <Router>        
        <Routes>
          <Route path="/" element={<Login />}/> 
          <Route path="/cadastro" element={<Cadastro/>} />  
          <Route path="/home" element={<Home/>} />
          <Route path="/nova-entrada" element={<AdicionarEntrada/>} />
          <Route path="nova-saida" element={<AdicionarSaida/>} />
        </Routes>
      </Router>
    </Contexto.Provider>
  )
}

createRoot(document.querySelector(".root")).render(<App></App>)
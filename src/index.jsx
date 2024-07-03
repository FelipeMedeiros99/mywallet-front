import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import "./assets/reset.css"
import "./assets/index.css"

import { Contexto } from "./Contexto"
import Login from "./Components/Login"
import { useState } from "react"
import Cadastro from "./Components/Cadastro"

// https://mywallet-back-p4xq.onrender.com

function App(){
  const [dadosUsuario, setDadosUsuario] = useState({})
  const [tokenUsuario, setTokenUsuario] = useState('')
  console.log(dadosUsuario)
  console.log(tokenUsuario)
  return(
    <Contexto.Provider value={{dadosUsuario, setDadosUsuario, tokenUsuario, setTokenUsuario}}>
      <Router>        
        <Routes>
          <Route path="/" element={<Login />}/> 
          <Route path="/cadastro" element={<Cadastro/>} />  
        </Routes>
      </Router>
    </Contexto.Provider>
  )
}

createRoot(document.querySelector(".root")).render(<App></App>)
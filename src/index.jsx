import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import "./assets/reset.css"
import "./assets/index.css"

import { Contexto } from "./Contexto"
import Login from "./Components/Login"
import { useState } from "react"

// https://mywallet-back-p4xq.onrender.com

function App(){
  const [dadosUsuario, setDadosUsuario] = useState({})
  const [headerUsuario, setHeaderUsuario] = useState({})

  return(
    <Contexto.Provider value={{dadosUsuario, setDadosUsuario, headerUsuario, setHeaderUsuario}}>
      <Router>        
        <Routes>
          <Route path="/" element={<Login />}/> 
        </Routes>
      </Router>
    </Contexto.Provider>
  )
}

createRoot(document.querySelector(".root")).render(<App></App>)
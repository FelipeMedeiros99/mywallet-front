import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./assets/reset.css";
import "./assets/index.css";

import { Contexto } from "./Contexto";
import Login from "./Components/Login";
import { useState } from "react";
import Cadastro from "./Components/Cadastro";
import Home from "./Components/Home";
import AdicionarEntrada from "./Components/AdicionarEntrada";
import AdicionarSaida from "./Components/AdicionarSaida";
import EditarTransacao from "./Components/EditarTransacao";


function App(){
  // estados
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [tokenUsuario, setTokenUsuario] = useState('');
  const [editarTransacao, setEditarTransacao] = useState({});
  
  // vars
  const estadosCompartilhados = {
      dadosUsuario, 
      setDadosUsuario, 
      tokenUsuario, 
      setTokenUsuario, 
      editarTransacao, 
      setEditarTransacao
  };

  return(
    <Contexto.Provider value={estadosCompartilhados}>
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
  );
};

createRoot(document.querySelector(".root")).render(<App></App>);
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState } from "react"

import { manipuladorDeInput } from "../../utils/ferramentas"
import axios from "axios"

// TODO: CRIAR FUNÇÃO PARA O ONSUBMIT NÃO FICAR TAO FEIO
// LEVAR PARA A PÁGINA PRINCIPAL CASO A ENTRADA SEJA VÁLIDA

export default function Login({}){
    const [loginInputs, setLoginInputs] = useState({"E-mail": "", "Senha": ""})
    

    return(
        <TelaLogin onSubmit={async(e)=>{
            e.preventDefault()
            try{
                console.log("estou aqui")
                const dados = await axios.post("https://mywallet-back-p4xq.onrender.com/login", loginInputs)
                console.log(dados.data)
            }catch(erro){
                console.log("Erro ao fazer login: ", erro)
            }
            }}>
            <h1>MyWallet</h1>
            <input 
                type="email" 
                placeholder="E-mail"
                required
                value={loginInputs["E-mail"]}
                onChange={(e)=> manipuladorDeInput(e, loginInputs, "E-mail", setLoginInputs)}                    
            />

            <input 
                type="password" 
                placeholder="Senha"
                required
                minLength="6"
                value={loginInputs.Senha}
                onChange={(e)=>manipuladorDeInput(e, loginInputs, "Senha", setLoginInputs)}
            />

            <button type="submit" >Entrar</button>

            <Link to="/cadastro">Primeira vez? Cadastre-se</Link>
        </TelaLogin>

    )
}


const TelaLogin = styled.form`
    display: flex;
    flex-direction: column;
` 
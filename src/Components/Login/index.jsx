import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState } from "react"

import { manipuladorDeInput } from "../../utils/ferramentas"
import executarRequisicao from "../../utils/requisicoes"


// LEVAR PARA A PÁGINA PRINCIPAL CASO A ENTRADA SEJA VÁLIDA

/**
 * Tela inicial de login
 */
export default function Login({ }) {
    const [loginInputs, setLoginInputs] = useState({ "E-mail": "", "Senha": "" })
    const indicesTipos = ['email', 'password']
    const minimosRequeridos = ["7", "6"]

    async function subimissao(evento){
        evento.preventDefault()
        const dados = await executarRequisicao("login", 'post', loginInputs, "Não foi possível efetuar login")
        console.log(dados?.data)
    }


    function renderInputs(titulo, indice){
        return(
            <input
                    key={titulo}
                    type={indicesTipos[indice]}
                    placeholder={titulo}
                    required
                    value={loginInputs[titulo]}
                    minLength={minimosRequeridos[indice]}
                    onChange={(evento) => manipuladorDeInput(evento, loginInputs, titulo, setLoginInputs)}
            />
        )
    }

    
    return (
        // form
        <TelaLogin onSubmit={async (e) => await subimissao(e)}>

            <h1>MyWallet</h1>
            
            {/* Caixas de input */}
            {Object.keys(loginInputs).map((titulo, indice) => renderInputs(titulo, indice))}

            <button type="submit" >Entrar</button>
            <Link to="/cadastro">Primeira vez? Cadastre-se</Link>

        </TelaLogin>

    )
}


const TelaLogin = styled.form`
    display: flex;
    flex-direction: column;
` 
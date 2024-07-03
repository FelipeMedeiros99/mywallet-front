import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios"

import { manipuladorDeInput } from "../../utils/ferramentas"
import { Contexto } from "../../Contexto"

  
// LEVAR PARA A PÁGINA PRINCIPAL CASO A ENTRADA SEJA VÁLIDA

/**
 * Tela inicial de login
 */
export default function Login({ }) {
    const [loginInputs, setLoginInputs] = useState({ "E-mail": "", "Senha": "" })
    const [mensagemDeErro, setMensagemDeErro] = useState({'ativa': false, 'erro': ""})
    const indicesTipos = ['email', 'password']
    const minimosRequeridos = ["7", "6"]

    const {setDadosUsuario, setTokenUsuario} = useContext(Contexto)

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

    async function executarRequisicao(){
        try {
            const dados = await axios.post(`https://mywallet-back-p4xq.onrender.com/login`, loginInputs)
            return dados
        } catch (erro) {
            const mensagemDeErro = erro.response.data
            setMensagemDeErro({"ativa": true, "erro": mensagemDeErro})
            console.log("Erro ao efetuar login: ", erro.response)
        }
    }

    async function subimissao(evento){
        evento.preventDefault()
        try{
            const dados = await executarRequisicao()
            const informacoesUsuario = dados?.data
            
            if(informacoesUsuario !== undefined){
                setTokenUsuario(informacoesUsuario.token)
                delete informacoesUsuario.token
                setDadosUsuario(informacoesUsuario)
            }
        }catch(e){
            console.log("Erro ao efetuar subimissão: ", e)
        }
    }

    return (
        <TelaLogin onSubmit={async (e) =>{const dados = await subimissao(e)}}>

            <h1>MyWallet</h1>

            {Object.keys(loginInputs).map((titulo, indice) => renderInputs(titulo, indice))}

            <button type="submit" >Entrar</button>

            {mensagemDeErro.ativa?<p>{mensagemDeErro["erro"]}</p>:<></>}

            <Link to="/cadastro">Primeira vez? Cadastre-se</Link>

        </TelaLogin>
    )
}


const TelaLogin = styled.form`
    display: flex;
    flex-direction: column;
` 
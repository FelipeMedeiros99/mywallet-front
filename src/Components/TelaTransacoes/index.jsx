import styled from "styled-components";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios"

import { renderButton, renderInputs } from "../../utils/ferramentas";
import { Contexto } from "../../Contexto"
import { useNavigate } from "react-router-dom";

/**
 * 
 * @param {string} tipo - se é entrada ou saída 
 * @param {Object} objetoDeValores - um objeto no formato {"Descrição": "", "Valor": 0}
 * @param {boolean} aguardandoTransacao - Desativa os inputs e botoes enquanto aguarda uma resposta
 */
export default function TelaTransacoes({tipo, objetoDeValores}){
    // estados 
    const [inputsTransacao, setInputsTansacao] = useState(objetoDeValores);
    const [aguardandoTransacao, setAguardandoTransacao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState({"ativo": false, "mensagem": ""})
    // vars
    const chaves = Object.keys(inputsTransacao);
    const tipos = ["text", "text"];
    const minimosRequeridos = ["3", "1"];
    const {tokenUsuario, setDadosUsuario} = useContext(Contexto)
    const navigate = useNavigate()

    // enviar dados para o servidor 
    async function enviarRequisicao(evento){
        evento.preventDefault();
        try{
            // Manipulando o cabeçalho
            const headers = {Authorization: tokenUsuario}

            // manipulando o objeto de envio
            const dados = {"Descricao": inputsTransacao['Descrição'], "Valor": parseFloat(inputsTransacao["Valor"].replace(",", "."))};
            // desativando inputs
            setAguardandoTransacao(true);
            // enviando requisição
            const resposta = await axios.post("https://mywallet-back-p4xq.onrender.com/transacao", dados, {headers: headers});
            // reativando inputs
            setAguardandoTransacao(false)
            if(resposta.status===201){
                setDadosUsuario(resposta.data)
                alert(`${tipo} adicionada com sucesso`)
                navigate('/home')
            }
        }catch(e){
            // reativando inputs
            console.log(e.response)
            setAguardandoTransacao(false)
            if(e.response.data?.split(":")[0]==='Token expirado'){
                alert(e.response.data)
                navigate("/")
            }
            setMensagemErro({"ativo": true, "mensagem": e.response.data})
        }
    };

    return(
        <Transacao onSubmit={enviarRequisicao}>
            {chaves.map((titulo, indice) =>(renderInputs(titulo, tipos[indice], minimosRequeridos[indice], aguardandoTransacao, inputsTransacao, setInputsTansacao)))}
            {renderButton('submit', `Salvar ${tipo}`, aguardandoTransacao, ()=>{})}
            {mensagemErro.ativo?<p>{mensagemErro.mensagem}</p>:<></>}
        </Transacao>
    )

};

const Transacao = styled.form`
    display: flex;
    flex-direction: column;
`

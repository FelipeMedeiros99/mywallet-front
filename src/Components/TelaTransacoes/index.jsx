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
export default function TelaTransacoes({tipo, objetoDeValores, Id="", editar=false}){
    // estados 
    const [inputsTransacao, setInputsTansacao] = useState({"Descrição": objetoDeValores.Descricao, "Valor": objetoDeValores.Valor});
    const [aguardandoTransacao, setAguardandoTransacao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState({"ativo": false, "mensagem": ""})
    // vars
    const chaves = Object.keys(inputsTransacao);
    const tipos = ["text", "text"];
    const minimosRequeridos = ["3", "1"];
    const {tokenUsuario, setDadosUsuario} = useContext(Contexto)
    const navigate = useNavigate()
    let resposta;
    let dados;
    // enviar dados para o servidor 
    async function enviarRequisicao(evento){
        console.log("inputs Transacao: ", inputsTransacao)
        evento.preventDefault();
        try{
            // Manipulando o cabeçalho
            const headers = {Authorization: tokenUsuario}

            // manipulando o objeto de envio
            if(tipo==="Entrada"){
                dados = {"Descricao": inputsTransacao['Descrição'], "Valor": parseFloat(`${inputsTransacao["Valor"]}`?.replace(",", "."))};
            }else if(tipo==="Saida"){
                dados = {"Descricao": inputsTransacao['Descrição'], "Valor": -parseFloat(`${inputsTransacao["Valor"]}`?.replace(",", "."))};
            }
            // desativando inputs
            setAguardandoTransacao(true);
            // enviando requisição
            if(!editar){
               resposta = await axios.post("https://mywallet-back-p4xq.onrender.com/transacao", dados, {headers: headers});
            }else{
                objetoDeValores.Valor = objetoDeValores.Tipo==="Entrada"?inputsTransacao?.Valor:-inputsTransacao?.Valor
                objetoDeValores.Descricao = inputsTransacao["Descrição"]
                objetoDeValores.Tipo = `${objetoDeValores.Tipo}s`
                resposta = await axios.put("https://mywallet-back-p4xq.onrender.com/editar", objetoDeValores, {headers: headers})
                console.log("Resposta: ", resposta?.data)
            }
            // reativando inputs
                setAguardandoTransacao(false)
            if(resposta?.status===201){
                setDadosUsuario(resposta?.data)
                navigate('/home')
            }
        }catch(e){
            // reativando inputs
            console.log("Erro: ", e.response || e)
            setAguardandoTransacao(false)
            if(e.response.data?.split(":")[0]==='Token expirado'){
                alert(e.response.data)
                navigate("/")
            }
            setMensagemErro({"ativo": true, "mensagem": e.response.data})
        }
    };

    console.log("Objeto de valore: ", objetoDeValores)

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
    margin-top: 40px
`

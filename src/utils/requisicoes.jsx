import axios from "axios"

/**
 * 
 * @param {string} rotaServidor - rota do link
 * @param {string} metodoHTTP - POST, GET, PUT, DELETE
 * @param {Object} objetoEnvio - Objeto que será enviado
 * @param {string} mensagemErro - Mensagem de possível erro
 * @returns - Dados recebidos do servidor
 */
export default async function executarRequisicao(rotaServidor, metodoHTTP, objetoEnvio, mensagemErro) {
    try {
        const dados = await axios[metodoHTTP](`https://mywallet-back-p4xq.onrender.com/${rotaServidor}`, objetoEnvio)
        return dados
    } catch (erro) {
        console.log(mensagemErro, erro.response)
    }

}
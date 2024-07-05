import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios"

import { renderInputs, renderButton } from "../../utils/ferramentas"
import { Contexto } from "../../Contexto"
import { EstiloTelaLoginCadastro } from "../../assets/EstiloTelaLoginCadastro"

/**
 * Tela inicial de login
 */
export default function Login({ }) {
    // estados
    const [loginInputs, setLoginInputs] = useState({ "E-mail": "", "Senha": "" });
    const [mensagemDeErro, setMensagemDeErro] = useState({ 'ativa': false, 'erro': "" });
    const [aguardandoRequisicao, setAguardandoRequisicao] = useState(false);
    // vars
    const indicesTipos = ['email', 'password'];
    const minimosRequeridos = ["7", "6"];
    const navigate = useNavigate();

    // variáveis globais
    const { setDadosUsuario, setTokenUsuario } = useContext(Contexto);

    // function renderButton(texto, ativo)

    /**
     * Realiza a requisição de login para o servidor
     * @returns - recebe os dados do usuário e o token de acesso
     */
    async function executarRequisicao() {
        try {
            // desativando inputs
            setAguardandoRequisicao(true)
            // enviando requisição
            const dados = await axios.post(`https://mywallet-back-p4xq.onrender.com/login`, loginInputs)
            // reativando input
            setAguardandoRequisicao(false)
            // Retornando os dados 
            return dados
        } catch (erro) {
            // reativando input em caso de erro
            setAguardandoRequisicao(false)
            // controle de erros
            const mensagemDeErro = erro?.response?.data
            setMensagemDeErro({ "ativa": true, "erro": mensagemDeErro || erro })
            console.log("Erro ao efetuar login: ", erro?.response || erro)
        }
    };

    /**
     * Atualiza o estado dadosDoUsuário e tokenDoUsuário se a requisição for recebida com sucesso
     * @param {Object} evento - Objeto que recebemos automaticamente
     */
    async function subimissao(evento) {
        // evitando dos dados serem perdidos 
        evento.preventDefault()

        try {
            // efetuando requisição para o servidor
            const dados = await executarRequisicao()
            const informacoesUsuario = dados?.data

            // validando as informações e atualizando estado
            if (informacoesUsuario !== undefined) {
                // salvando token
                setTokenUsuario(`Bearer ${informacoesUsuario.token}`)
                delete informacoesUsuario.token
                // salvando dados
                setDadosUsuario(informacoesUsuario)
                // desativando mensagem de erro, se existir
                setMensagemDeErro({ ...mensagemDeErro, ativa: false })
                // Enviando usuário para a tela principal
                navigate("/home")

            }
        } catch (e) {
            // controle de erros
            console.log("Erro ao efetuar subimissão: ", e)
        }
    }

    return (
        <EstiloTelaLoginCadastro onSubmit={async (e) => { await subimissao(e) }}>
            <h1>MyWallet</h1>
            {/* inputs da tela */}
            {Object.keys(loginInputs).map((titulo, indice) => (renderInputs(titulo, indicesTipos[indice], minimosRequeridos[indice], aguardandoRequisicao, loginInputs, setLoginInputs)))}
            {/* botao */}
            {renderButton("submit", "Entrar", aguardandoRequisicao, ()=>{})}
            {/* Mensagem de erro */}
            {mensagemDeErro.ativa ? <p>{mensagemDeErro["erro"]}</p> : <></>}
            {/* Link para o cadastro */}
            <Link to="/cadastro">Primeira vez? Cadastre-se</Link>
        </EstiloTelaLoginCadastro>
    )
}

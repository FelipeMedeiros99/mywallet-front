import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

import { RenderInputs, renderButton, atualizaSaldo } from "../../utils/ferramentas";
import { Contexto } from "../../Contexto";
import { EstiloTelaLoginCadastro } from "../../assets/EstiloTelaLoginCadastro";


export default function Login({ }) {
    // ================ estados =====================
    const [loginInputs, setLoginInputs] = useState({ "E-mail": "", "Senha": "" });
    const [mensagemDeErro, setMensagemDeErro] = useState({ 'ativa': false, 'erro': "" });
    const [aguardandoResposta, setAguardandoResposta] = useState(false);

    // ================= vars ========================
    const tiposInputs = ['email', 'password'];
    const minimosRequeridos = ["7", "6"];
    const navigate = useNavigate();

    // ============= variáveis globais ===================
    const { setDadosUsuario, setTokenUsuario } = useContext(Contexto);

    // ================== funções =========================

    /**
     * Realiza a requisição de login para o servidor
     * @returns - recebe os dados do usuário e o token de acesso
     */
    async function executarRequisicao() {
        try {
            // desativando inputs
            setAguardandoResposta(true);
            // enviando requisição
            const dados = await axios.post(`https://mywallet-back-p4xq.onrender.com/login`, loginInputs);
            // reativando input
            setAguardandoResposta(false);
            // Retornando os dados 
            return dados;
        
        } catch (erro) {
            // reativando input em caso de erro
            setAguardandoResposta(false);
            // controle de erros
            const mensagemDeErro = erro?.response?.data || erro;
            setMensagemDeErro({ "ativa": true, "erro": mensagemDeErro});
            console.log("Erro ao efetuar login: ", erro?.response);
        };
    };

    /**
     * Atualiza o estado dadosDoUsuário e tokenDoUsuário se a requisição for recebida com sucesso
     * @param {Object} evento - Objeto que recebemos automaticamente
     */
    async function subimissao(evento) {
        // evitando dos dados serem perdidos 
        evento.preventDefault();

        try {
            // efetuando requisição para o servidor
            const dados = await executarRequisicao();
            const informacoesUsuario = dados?.data;

            // validando as informações e atualizando estado
            if (informacoesUsuario !== undefined) {
                // salvando token
                setTokenUsuario(`Bearer ${informacoesUsuario.token}`);
                delete informacoesUsuario.token;
                // atualizando saldo
                let Saldo = atualizaSaldo(informacoesUsuario);
                // salvando dados
                setDadosUsuario({...informacoesUsuario, Saldo});
                // desativando mensagem de erro, se existir
                setMensagemDeErro({ ...mensagemDeErro, ativa: false });
                // Enviando usuário para a tela principal
                navigate("/home");
            };
        } catch (e) {
            // controle de erros
            console.log("Erro ao efetuar subimissão: ", e);
        }
    }

    // =================== Componentes =======================

    function Botoes(){
        return(
            renderButton("submit", "Entrar", aguardandoResposta, ()=>{})
        )
    }

    function MensagemErro(){
        return(
            mensagemDeErro.ativa ? <p className="erro">{mensagemDeErro["erro"]}</p> : <></>
        )
    }
    
    return (
        <EstiloTelaLoginCadastro onSubmit={(e)=>subimissao(e)}>
            <h1>MyWallet</h1>
            {Object.keys(loginInputs).map((titulo, indice)=>(
            <RenderInputs 
                key={indice}
                titulo={titulo} 
                tipo={tiposInputs[indice]} 
                minimoRequerido={minimosRequeridos[indice]} 
                isAtivo={aguardandoResposta} 
                estado={loginInputs}
                manipuladorEstado={setLoginInputs}/>))}
            <Botoes />
            <MensagemErro />            
            <Link to="/cadastro">Primeira vez? Cadastre-se</Link>
        </EstiloTelaLoginCadastro>
    )
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { RenderInputs, renderButton } from "../../utils/ferramentas";
import { EstiloTelaLoginCadastro } from "../../assets/EstiloTelaLoginCadastro";


export default function Cadastro(){
    
    // ================ estados ===================
    const [inputsCadastro, setInputsCadastro] = useState({"Nome": "", "E-mail": "", "Senha": "", "Confirme a senha": ""});
    const [aguardandoResposta, setAguardandoResposta] = useState(false);
    const [erroRecebido, setErroRecebido] = useState({'ativo': false, "mensagem": ""});
    
    // ================== vars ====================
    const tiposInputs = ["text", "email", "password", "password"];
    const minimosRequeridos = ["2", "6", "6", "6"];
    const navigate = useNavigate();

    // ================= funções ==================
    async function enviarRequisicao(){
        try{
            // organizando os dados
            let copiaDados = {...inputsCadastro};
            copiaDados.Confirmar = copiaDados["Confirme a senha"];
            delete copiaDados["Confirme a senha"];
            // desativando inputs e botoes enquanto a requisição é feita
            setAguardandoResposta(true);
            // enviando requisiçao para o servidor
            const resposta = await axios.post("https://mywallet-back-p4xq.onrender.com/cadastro", copiaDados);
            // reativando inputs e botoes
            setAguardandoResposta(false);
            // se tudo estiver ok, direcionar para a tela de login
            if(resposta.status === 200){
                alert("cadastro realizado com sucesso");
                setErroRecebido({'ativo': false, "mensagem": ""});
                navigate("/");
            }

        }catch(e){
            // reativando inputs e botoes
            setAguardandoResposta(false);
            // atualizando mensagem de erro
            setErroRecebido({"ativo": true, "mensagem": e?.response?.data||e});
            console.log("Erro ao enviar dados: ", e?.response||e);
        };
    };

    async function submissao(evento){
        evento.preventDefault();
        // validando se a senha e a confirmação estão iguais
        if(inputsCadastro["Senha"]!==inputsCadastro["Confirme a senha"]){
            setErroRecebido({"ativo": true, "mensagem": "Senha e confirmação precisam ser iguais"});
            return;
        }
        // enviando dados para o servidor
        await enviarRequisicao();
    }

    // ================= Componentes ===============

    function Botoes(){
        return(
            renderButton("submit", "Cadastrar", aguardandoResposta, ()=>{})
        )
    }

    function MensagemErro(){
        return(
            erroRecebido.ativo?<p>{erroRecebido.mensagem}</p>:<></>
        )
    }


    return(
        <EstiloTelaLoginCadastro onSubmit={submissao}>
            <h1>MyWallet</h1>
            {Object.keys(inputsCadastro).map((titulo, indice)=>(
            <RenderInputs 
                titulo={titulo} 
                tipo={tiposInputs[indice]} 
                minimoRequerido={minimosRequeridos[indice]} 
                isAtivo={aguardandoResposta} 
                estado={inputsCadastro}
                manipuladorEstado={setInputsCadastro}
            />))}
            <Botoes />
            <MensagemErro />
            <Link to="/" >Já possui uma conta? Entre agora!</Link>

        </EstiloTelaLoginCadastro>
    )
}
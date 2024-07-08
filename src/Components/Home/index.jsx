import styled from "styled-components"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { RxExit } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";

import { Contexto } from "../../Contexto";
import { atualizaSaldo } from "../../utils/ferramentas";


export default function Home() {

    // ===================== vars ===============================
    const navigate = useNavigate();
    const { 
        dadosUsuario, 
        setDadosUsuario,
        setTokenUsuario, 
        tokenUsuario, 
        setEditarTransacao 
    } = useContext(Contexto);

    
    // ==================== hooks ===============================

    // indo para tela inicial se a tela recarregar
    useEffect(() => {
        if (dadosUsuario.Nome === undefined) {
            navigate("/");
        }
    }, []);

    // atualização de saldo
    useEffect(() => {
        const Saldo = atualizaSaldo(dadosUsuario);
        setDadosUsuario({ ...dadosUsuario, Saldo: Saldo });
    }, []);


    // ====================== functions =========================
    
    /**
     * apaga dados do servidor
     * @param {int} id - id da transação que será deletado
     */
    async function deletarTransacao(id) {
        try {
            // cabeçalho de envio
            const cabecalho = {
                headers: { Authorization: tokenUsuario },
                data: { Id: id }
            };
            // requisição
            const promessa = await axios.delete("https://mywallet-back-p4xq.onrender.com/deletar", cabecalho);
            // atualizando dados no front
            setDadosUsuario(promessa.data);

        } catch (e) {
            console.log("erro ao deletar transacao: ", e?.response||e);
        };
    };

    /**
     * Editar transação
     * @param {Object} dado - Objeto de dados do usuário
     */
    function editarTransacao(dado) {
        // definindo o tipo de transação

        dado.Tipo = "Saidas";
        if (dado?.Valor > 0) {
            dado.Tipo = "Entradas";
        }
        // armazenando dados da transação que será editado
        setEditarTransacao(dado);
        navigate("/editar-transacao");
    };


    // ================= Componentes da tela =====================

    function Topo(){
        return(
            <div className="topo">
                <h2>Olá {dadosUsuario.Nome}!</h2>
                <IconeSair/>
            </div>
        )
    }

    function IconeSair(){
        return(
            <RxExit className="sair" onClick={() => {
                setDadosUsuario({})
                setTokenUsuario("")
                navigate('/')
            }}/>
        )
    }

    function RenderizarTransacoes({dado, indice}){
        return (
            <li key={indice}>
                {/* Renderizar as informações da transação  */}
                <div className="container-span" onClick={() =>editarTransacao(dado)}>
                    <span className="data">{dado?.Data}</span>
                    <span className="descricao">{`${dado?.Descricao}`.trim()}</span>
                </div>
                <span className={dado?.Valor<0?"saida valor": "entrada valor"}>{`${Math.abs(parseFloat(dado?.Valor))?.toFixed(2)}R$`?.replace('.', ',')}</span>
                
                {/* icone para deletar transação */}
                <IoCloseOutline 
                    className="remover" 
                    onClick={async () => deletarTransacao(dado.Id)}
                    size={"16"}/>
            </li>
        )
    }

    function Transacoes(){
        return(
            <>
                {dadosUsuario?.Saidas?.map((dado, indice) => <RenderizarTransacoes dado={dado} indice={indice} />)}
                {dadosUsuario?.Entradas?.map((dado, indice) => <RenderizarTransacoes dado={dado} indice={indice} />)}
               
            </>
        )
    }

    function Saldo(){
        return(    
        dadosUsuario?.Entradas?.length > 0 || dadosUsuario?.Saidas?.length > 0 ?(
            <div className="container-saldo">
                <p className="saldo">SALDO: </p>
                <p className={dadosUsuario.Saldo<0?"saida valor": "entrada valor"}>{`${dadosUsuario.Saldo?.toFixed(2)}R$`.replace(".", ",")}</p>
            </div>
            ):(
                <div className="aviso"><p>Não há registros de entrada ou saída</p></div>
            )       
        )
    }

    function Botoes(){
        return(
            <div className="botoes">
                <button onClick={() => navigate("/nova-entrada")} className="botao-entrada">Nova entrada</button>
                <button onClick={() => navigate("/nova-saida")} className="botao-saida">Nova saída</button>
            </div>
        )
    }

    return (
        <Main>
            <Topo/>
            <TelaTransacoes>
                 <Transacoes/>
            </TelaTransacoes>
            <Saldo />
            <Botoes />

        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;

    .saida{
        color: #C70000;
    }

    .entrada{
        color: #03AC00;
    }

    .topo{
        position: absolute;
        top: 0;
        display: flex;
        width: 100%;
        max-width: 500px;
        justify-content: space-between ;
    }

    .sair{
        width: 30px;
        height: 30px;
        color: white;
    }

    .sair:hover{
        cursor: pointer;
        width: 35px;
        height: 35px;
        
    }

    .botoes{
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 500px;
    }

    .botao-entrada{
        margin-right: 5px;
    }

    .botao-saida{
        margin-left: 5px;
    }

    button{
        width: 100%;
        height: 114px;
        max-width: 250px;
    }

    .aviso{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container-saldo{
        display: flex;
        width: 100%;
        padding: 0 15px 0 15px;
        height: 40px;
        max-width: 500px;
        justify-content: space-between;
        align-items: center;
        bottom: 10px;
        font-size: 17px;
        position: absolute;
        bottom: 140px;
        z-index: 2;
        background-color: white;
        border-radius: 5px;
    }
    
    .saldo{
        font-weight: 700;
    }
`

const TelaTransacoes = styled.ul`
        width: 100%;
        height: 100%;
        max-width: 500px;
        margin-top: 35px;
        margin-bottom: 140px;
        background-color: white;
        border-radius: 5px;
        padding: 23px 12px 50px 12px;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;

    li{
        position: relative;
        display: flex;
        width: 100%;
        justify-content: space-between;
        height: 40px;
        align-items: center;

    }

    li:hover{
        cursor: pointer;
        background-color: #ebebeb;
    }

    .container-span{
        width: 100%;
    }

    span{
        font-size: 16px;
    }

    .data{
        margin-right: 5px;
        color: #C6C6C6;
    }

    .valor{
        text-align: end;
        justify-content: flex-end;
        margin-right: 5px;
    }

    .descricao{
        display: inline-block;
        font-weight: 400;
        word-wrap: wrap;
    }

    .remover{
        
        color: #C6C6C6;
        height: 100%;
    }

    .remover:hover{
        color: red;
        background-color: #aaaaaa;
        height: 100%;
        width: 20px;
        /* height: 0px; */
    }

`
import styled from "styled-components"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { RxExit } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";

import { Contexto } from "../../Contexto"
import { atualizaSaldo } from "../../utils/ferramentas";


export default function Home() {
    const { dadosUsuario, setDadosUsuario, setTokenUsuario, tokenUsuario, setEditarTransacao } = useContext(Contexto)

    // vars
    const navigate = useNavigate()

    // voltando para a página inicial caso os dados sejam perdidos
    useEffect(() => {
        if (dadosUsuario.Nome === undefined) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const Saldo = atualizaSaldo(dadosUsuario)
        setDadosUsuario({ ...dadosUsuario, Saldo: Saldo })
    }, [])




    async function deletarTransacao(id) {
        console.log("clicou")
        try {
            const promessa = await axios.delete("https://mywallet-back-p4xq.onrender.com/deletar",
                {
                    headers: { Authorization: tokenUsuario },
                    data: { Id: id }
                })

            console.log("resposta servidor: ", promessa)
            setDadosUsuario(promessa.data)
        } catch (e) {
            console.log("erro ao deletar transacao: ", e.response)
        }
    }

    function editarTransacao(dado) {
        if (dado?.Valor > 0) {
            dado.Tipo = "Entradas"
        } else {
            dado.Tipo = "Saidas"
        }
        setEditarTransacao(dado)
        navigate("/editar-transacao")
    }

    function renderizaTransacoes(dado, indice) {
        return (

            <li key={indice} >
                <div className="container-span" onClick={() => editarTransacao(dado)}>
                    <span className="data">{dado?.Data}</span>
                    <span className="descricao">{`${dado?.Descricao}`.trim()}</span>
                    <span className={dado.Valor<0?"saida valor": "entrada valor"}>{`${Math.abs(parseFloat(dado?.Valor))?.toFixed(2)}R$`.replace('.', ',')}</span>
                </div>
                <IoCloseOutline className="remover" onClick={async () => deletarTransacao(dado.Id)}
                    size={"16"}
                    />
            </li>

        )
    }

    console.log("dados usuario: ", dadosUsuario)
    return (
        <Main>
            <div className="topo">
                <h2>Olá {dadosUsuario.Nome}!</h2>
                <RxExit onClick={() => {
                    setDadosUsuario({})
                    setTokenUsuario("")
                    navigate('/')
                }}
                />
            </div>
            <Transacoes>
                {dadosUsuario?.Saidas?.map((dado, indice) => renderizaTransacoes(dado, indice))}
                {dadosUsuario?.Entradas?.map((dado, indice) => renderizaTransacoes(dado, indice))}
                {/* {console.log(dadosUsuario?.Saidas)} */}
                {dadosUsuario?.Entradas?.length > 0 || dadosUsuario?.Saidas?.length > 0 ?
                    <div className="container-saldo">
                        <p className="saldo">SALDO: </p>
                        <p className={dadosUsuario.Saldo<0?"saida valor": "entrada valor"}>{`${dadosUsuario.Saldo?.toFixed(2)}R$`.replace(".", ",")}</p>
                    </div>
                    : <div className="aviso"><p>Não há registros de entrada ou saída</p></div>
                }
            </Transacoes>
            <div className="botoes">
                <button onClick={() => navigate("/nova-entrada")} className="entrada">Nova entrada</button>
                <button onClick={() => navigate("/nova-saida")} className="saida">Nova saída</button>
            </div>

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
    .topo{
        position: absolute;
        top: 0;
        display: flex;
        width: 100%;
        max-width: 326px;
        justify-content: space-between ;
    }

    .botoes{
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 326px;
    }

    .entrada{
        margin-right: 5px;
    }

    .saida{
        margin-left: 5px;
    }

    button{
        width: 100%;
        height: 114px;
        max-width: 155px;
    }

    .aviso{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Transacoes = styled.ul`
        width: 100%;
        height: 100%;
        max-width: 326px;
        margin-top: 35px;
        margin-bottom: 140px;
        background-color: white;
        border-radius: 5px;
        padding: 23px 12px 40px 12px;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;

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

    .container-saldo{
        display: flex;
        width: 90%;
        max-width: 300px;
        justify-content: space-between;
        bottom: 10px;
        font-size: 17px;
        position: absolute;
        bottom: 10px
    }
    
    .saldo{
        font-weight: 700;
    }

    span{
        font-size: 16px;
    }

    .saida{
        color: #C70000;
    }

    .entrada{
        color: #03AC00;
    }

    .data{
        margin-right: 5px;
        color: #C6C6C6;
    }

    .valor{
        position: absolute;
        right: 15px;
        text-align: center;
    }

    .descricao{
        font-weight: 400;
        max-width: 30px;
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
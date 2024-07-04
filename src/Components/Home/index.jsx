import styled from "styled-components"
import { useContext, useEffect } from "react"
import { Contexto } from "../../Contexto"
import { useNavigate } from "react-router-dom"
import { RxExit } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";


export default function Home(){
    const {dadosUsuario, setDadosUsuario, setTokenUsuario} = useContext(Contexto)

    // vars
    const navigate = useNavigate()

    // voltando para a página inicial caso os dados sejam perdidos
    useEffect(()=>{
        if(dadosUsuario.Nome === undefined){
            navigate("/")
        }
    }, [])

    function renderizaTransacoes(dado, indice){
        return(
            <li key={indice}>
                <span className="data">{dado?.Data}</span>
                <span className="descricao">{`${dado?.Descricao}`.trim()}</span>
                <span className="valor">{`${parseFloat(dado?.Valor)?.toFixed(2)}R$`.replace('.', ',')}</span>
                <IoCloseOutline />
            </li>
        )
    }

    return(
        <Main>
            <div className="topo">
                <h2>Olá {dadosUsuario.Nome}!</h2>
                <RxExit onClick={()=>{
                    setDadosUsuario({})
                    setTokenUsuario("")
                    navigate('/')
                    }}/>
            </div>
            <Transacoes>
                {dadosUsuario?.Saidas?.map((dado, indice)=>renderizaTransacoes(dado, indice))}
                {dadosUsuario?.Entradas?.map((dado, indice)=>renderizaTransacoes(dado, indice))}
                {/* {console.log(dadosUsuario?.Saidas)} */}
                {(dadosUsuario?.Saidas?.length===0 && dadosUsuario?.Entradas?.length===0)?"Não há registros de entrada ou saída":""}
                <div className="saldo">
                    <p>Saldo: </p>
                    <p>{`${dadosUsuario.Saldo?.toFixed(2)}R$`.replace(".", ",")}</p>
                </div>
            </Transacoes>
            <div className="botoes">
                <button onClick={()=>navigate("/nova-entrada")}>Nova entrada</button>
                <button onClick={()=>navigate("/nova-saida")}>Nova saída</button>
            </div>

        </Main>
    )
}

const Main = styled.main`
    .topo{
        display: flex;
        justify-content: space-between ;
    }
`

const Transacoes = styled.ul`
        max-width: 300px;

    li{
        display: flex;
        justify-content: space-between;
    }

    .saldo{
        display: flex;
        justify-content: space-between;
    }

`
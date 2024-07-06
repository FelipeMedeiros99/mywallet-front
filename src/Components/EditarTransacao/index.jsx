import TelaTransacoes from "../TelaTransacoes"
import { useContext } from "react"
import { Contexto } from "../../Contexto"
import EstiloTelaTransacao from "../../assets/EstiloTelaTransacao"

// TODO: DIFICULDADE PARA APROVEIRAR O TELATRANSACOES DEVIDO AO PARAMETRO DADOS SER PRE-REQUISITO. USAR ESTADO NO ESCOPO GLOBAL

export default function EditarTransacao(){
    // vars
    const {editarTransacao} = useContext(Contexto)
    const {Valor, Descricao, Id} = editarTransacao
    const tipo = Valor>=0?"Entrada":"Saida"
    return(
        <EstiloTelaTransacao>
            <h2>Editar {Valor>=0?"Entrada":"Saída"}</h2>
            <TelaTransacoes tipo={tipo} objetoDeValores={{Descricao: Descricao, "Valor": Math.abs(Valor), Id: Id, Tipo: tipo}} editar={true}></TelaTransacoes>
        </EstiloTelaTransacao>
            
    )

}

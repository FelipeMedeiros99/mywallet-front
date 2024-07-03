import styled from "styled-components"
import TelaTransacoes from "../TelaTransacoes"

export default function AdicionarEntrada(){
    
    return(
        <TelaEntrada>
            <h2>Nova entrada</h2>
            <TelaTransacoes tipo={"Entrada"} objetoDeValores={{"Descrição": "", "Valor":""}}></TelaTransacoes>
        </TelaEntrada>  
            
    )

}

const TelaEntrada = styled.div`
`
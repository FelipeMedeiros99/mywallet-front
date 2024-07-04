import styled from "styled-components"
import TelaTransacoes from "../TelaTransacoes"

export default function AdicionarSaida(){
    
    return(
        <TelaSaida>
            <h2>Nova entrada</h2>
            <TelaTransacoes tipo={"Saida"} objetoDeValores={{"Descrição": "", "Valor":""}}></TelaTransacoes>
        </TelaSaida>  
            
    )

}

const TelaSaida = styled.div`
`
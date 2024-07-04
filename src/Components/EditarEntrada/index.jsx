import styled from "styled-components"
import TelaTransacoes from "../TelaTransacoes"

// TODO: DIFICULDADE PARA APROVEIRAR O TELATRANSACOES DEVIDO AO PARAMETRO DADOS SER PRE-REQUISITO. USAR ESTADO NO ESCOPO GLOBAL

export default function EditarEntrada(){
    
    return(
        <TelaSaida>
            <h2>Editar entrada</h2>
            <TelaTransacoes tipo={"Entrada"} objetoDeValores={{"Descrição": "", "Valor":"", Id: ""}} editar={true}></TelaTransacoes>
        </TelaSaida>  
            
    )

}

const TelaSaida = styled.div`
`
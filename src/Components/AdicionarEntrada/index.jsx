import styled from "styled-components"
import TelaTransacoes from "../TelaTransacoes"
import EstiloTelaTransacao from "../../assets/EstiloTelaTransacao"

export default function AdicionarEntrada(){
    
    return(
        <EstiloTelaTransacao>

            <h2>Nova entrada</h2>
            <TelaTransacoes 
                tipo={"Entrada"} 
                objetoDeValores={
                    {
                        "Descrição": "", 
                        "Valor":""
                    }
                }> 
            </TelaTransacoes>
        
        </EstiloTelaTransacao>
            
    )

}

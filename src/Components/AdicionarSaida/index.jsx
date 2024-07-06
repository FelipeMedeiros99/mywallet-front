import TelaTransacoes from "../TelaTransacoes"
import EstiloTelaTransacao from "../../assets/EstiloTelaTransacao"

export default function AdicionarSaida(){
    
    return(
        <EstiloTelaTransacao>
            <h2>Nova saida</h2>
            <TelaTransacoes tipo={"Saida"} objetoDeValores={{"Descrição": "", "Valor":""}}></TelaTransacoes>
        </EstiloTelaTransacao>
            
    )

}

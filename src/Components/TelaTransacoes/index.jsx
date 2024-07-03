import styled from "styled-components";
import { renderButton, renderInputs } from "../../utils/ferramentas";
import { useState } from "react";

/**
 * 
 * @param {string} tipo - se é entrada ou saída 
 * @param {Object} objetoDeValores - um objeto no formato {"Descrição": "", "Valor": 0}
 * @param {boolean} aguardandoTransacao - Desativa os inputs e botoes enquanto aguarda uma resposta
 */
export default function TelaTransacoes({tipo, objetoDeValores}){
    // estados 
    const [inputsTransacao, setInputsTansacao] = useState(objetoDeValores)
    const [aguardandoTransacao, setAguardandoTransacao] = useState(false)
    // vars
    const chaves = Object.keys(inputsTransacao)
    const tipos = ["text", "number"]
    const minimosRequeridos = ["3", "1"]

    return(
        <Transacao>
            {chaves.map((titulo, indice) =>(renderInputs(titulo, tipos[indice], minimosRequeridos[indice], aguardandoTransacao, inputsTransacao, setInputsTansacao)))}
            {renderButton('submit', `Salvar ${tipo}`, aguardandoTransacao, ()=>{})}
        </Transacao>
    )

}

const Transacao = styled.form`
    display: flex;
    flex-direction: column;
`

import { PulseLoader } from "react-spinners";

/**
 * Manipula os inputs usando os estados
 * @param {Object} evento - Objeto recebido por padrão do input 
 * @param {Object} estado - Estado que será manipulado no input
 * @param {string} chave - Chave do objeto que está sendo manipulado
 * @param {Function} setEstado - Manipula o valor do input
 */
function manipuladorDeInput(evento, estado, chave, setEstado){
        let copiaEstado = {...estado}
        setEstado({...copiaEstado, [chave]: evento.currentTarget.value})
}

/**
 * 
 * @param {string} titulo - Nome que aparece no placeholder e referencia o elemento do estado que será manipulado
 * @param {string} tipo - tipo de input: password, text, etc...
 * @param {string} minimoRequerido - valor de caracteres mínimos
 * @param {boolean} isAtivo - ativa ou desativa o input
 * @param {Object} estado - objeto de estados que será manipulado
 * @param {Object} manipuladorEstado - setEstado, manipulador do estado
 * @returns 
 */
export function RenderInputs({titulo, tipo, minimoRequerido, isAtivo, estado, manipuladorEstado}) {
        return (
            <input
                key={titulo}
                type={tipo}
                placeholder={titulo}
                required
                value={estado[titulo]}
                minLength={minimoRequerido}
                onChange={(evento) => manipuladorDeInput(evento, estado, titulo, manipuladorEstado)}
                disabled={isAtivo}
            />
            );
    };


/**
 * @param {string} tipo - tipo do botão: subimit, etc..
 * @param {string} texto - Texto do botao
 * @param {boolean} ativo - ativo ou inativo
 * @param {function} funcao - funcao para o onclick
        
 }}} funcao 
 * @returns 
 */
export function renderButton(tipo, texto, ativo, funcao){        
    return(
        <button type={tipo} disabled={ativo} onClick={funcao}>
                {ativo?<PulseLoader color="#ffffff" size={10}/> : texto}
        </button>
        );
}

/**
 * Mantém o saldo atualizado a cada transação
 * @param {Object} dadosUsuario 
 * @returns 
 */
export function atualizaSaldo(dadosUsuario){
        let Saldo = 0
        dadosUsuario.Entradas?.forEach((entrada)=>{Saldo += parseFloat(entrada.Valor)})
        dadosUsuario.Saidas?.forEach((saida)=> {Saldo +=parseFloat(saida.Valor)})
        return Saldo
}
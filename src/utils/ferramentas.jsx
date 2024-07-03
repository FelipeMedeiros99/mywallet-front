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

// /**
//      * renderização dos inputs de forma automatica
//      * @param {string} titulo - Título do objeto, usado como placeholder 
//      * @param {int} indice - contador do map
//      * @param {boolean} ativo - define se o input estará ativo ou não
//      * @param {Object} estado - estado que controla o input
//      * @param {string} minimoRequerido -  que contenha o valor minimo de caracteres que os inputs devem ter, controlados pelo index do map
//      * @param {Object} manipuladorEstado - setEstado, manipulador do estado
//      * */
// export function renderInputs(titulo, indice, ativo, estado, minimoRequerido, manipuladorEstado) {
//     return (
//         <input
//             key={titulo}
//             type={estado[indice]}
//             placeholder={titulo}
//             required
//             value={estado[titulo]}
//             minLength={minimoRequerido[indice]}
//             onChange={(evento) => manipuladorDeInput(evento, estado, titulo, manipuladorEstado)}
//             disabled={ativo}
//         />
//         );
// };


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
export function renderInputs(titulo, tipo, minimoRequerido, isAtivo, estado, manipuladorEstado) {
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
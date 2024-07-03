/**
 * Manipula os inputs usando os estados
 * @param {Object} evento - Objeto recebido por padrão do input 
 * @param {Object} estado - Estado que será manipulado no input
 * @param {string} chave - Chave do objeto que está sendo manipulado
 * @param {Function} setEstado - Manipula o valor do input
 */


export function manipuladorDeInput(evento, estado, chave, setEstado){
        let copiaEstado = {...estado}
        setEstado({...copiaEstado, [chave]: evento.currentTarget.value})
}
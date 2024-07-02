/**
 * Manipula os inputs usando os estados
 * @param {Object} evento 
 * @param {Object} estado 
 * @param {string} chave 
 * @param {Function} setEstado 
 */

export function manipuladorDeInput(evento, estado, chave, setEstado){
        let copiaEstado = {...estado}
        setEstado({...copiaEstado, [chave]: evento.currentTarget.value})
}
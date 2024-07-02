import styled from "styled-components"
import { Link } from "react-router-dom"

export default function Login({}){
    return(
        <TelaLogin>
            <h1>MyWallet</h1>
            <input 
                type="email" 
                placeholder="E-mail"
                required
            />

            <input 
                type="password" 
                placeholder="Senha"
                required
                minLength="6"
            />

            <button type="submit">Entrar</button>

            <Link to="/cadastro">Primeira vez? Cadastre-se</Link>
        </TelaLogin>

    )
}


const TelaLogin = styled.form`
    display: flex;
    flex-direction: column;
` 
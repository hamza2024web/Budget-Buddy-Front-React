import React,{useState} from "react";
import { login } from "../services/api";

function LoginForm({onLogin}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try{
            const response = await login({email,password});

            if(response.token) {
                localStorage.setItem('token',response.token);
                onLogin(true);
            }
        } catch (err){
            setError('Identifiants incorrects');
            console.error('Errer de connexion',err);
        }
    };

    return (
        <form onSubmit={handleSubmitLogin} className="login-form">
        <h2>Login To Your Account</h2>
        <div>
            <label>email</label>
            <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="saiser l'email de votre account"
            />
        </div>
        <div>
            <label>password</label>
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="saiser le mot de passe de votre account"
            />
        </div>
        <button type="submit">Login</button>
    </form>
    );
}
export default LoginForm
import React, { useState } from "react";
import "../signUp/signUp.css";
import axios from "axios";
import glogo from "../../assets/images/g-logo.png"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setuser] = useState({});
  const [error, seterror] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
        const response = await axios.post("http://127.0.0.1:8000/api/signIn",
            {email,password}
        )
        setuser(response.data.user)
        localStorage.setItem("token", response.data.token);
        window.location.reload();
    }catch(err){
        seterror(err.message)
    }
  }
  return (
    <form>
        {error&&error}  
      <input
        type="email"
        name="email"
        id="loginEmail"
        placeholder="E-mail"
        required
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id="loginPassword"
        placeholder="Mot de passe"
        required
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <div className="btns">
        <button type="submit"
        
        onClick={(e)=>handleSubmit(e)}>Se connecter</button>
        <div className="google-sign">
                    <img className="glogo" src={glogo} alt="Google logo" />
                    <a href="http://localhost:8000/api/auth/google/redirect">
                      S'inscrire avec Google
                    </a>
                  </div>
        <a href="/forgot-password" className="forgot-password">
          Mot de passe oublié ?
        </a>
      </div>
      
    </form>
  );
}

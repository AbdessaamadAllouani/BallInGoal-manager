import React from 'react';
import '../signUp/signUp.css';

export default function SignIn() {
    return (
        <form>
            <input type="email" name="email" id="loginEmail" placeholder='E-mail' required />
            <input type="password" name="password" id="loginPassword" placeholder='Mot de passe' required />
            <div className='btns'>
                <button type="submit">Se connecter</button>
                <a href="/forgot-password" className="forgot-password">Mot de passe oublié ?</a>
            </div>
        </form>

    );
}
import React, { useState } from 'react';
import glogo from '../../assets/images/g-logo.png';
import './signUp.css';
export default function SignUp({ onClose }) {
    return (
        <React.Fragment>
            <span className='form-title'>Créer un compte</span>
            <form>
                <select name="userType" id="userType">
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                </select>
                <input type="email" name="email" id="email" placeholder='E-mail' required />
                <input type="tel" id="telephone" name="telephone" placeholder="Numéro de telephone" required />
                <input type="password" name="password" id="password" placeholder='Mot de passe' required />
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirmer le mot de passe' required />
                <div className='btns'>
                    <button type="submit">Continuer</button>
                    <div className='google-sign'>
                        <img className='glogo' src={glogo} alt="Google logo" />
                        <a href="/google-auth">S'inscrire avec Google</a>
                    </div>
                </div>
            </form>
        </React.Fragment>

    );
}
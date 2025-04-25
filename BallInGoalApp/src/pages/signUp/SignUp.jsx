import React from 'react';
import logo from '../../assets/images/logo.png';
import glogo from '../../assets/images/g-logo.png';
import './signUp.css';

export default function SignUp() {
    return (
        <div className='signup-container'>
            <div className='back-container'>
                <header>
                    <div className='container-img'>
                        <img
                            className='logo'
                            src={logo}
                            alt="logo"
                        />
                    </div>
                    <button className='connextion-btn'>Connexion</button>
                </header>
            </div>
            <div className='center-container'>
                <div className='form-container'>
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
                </div>
            </div>
        </div>
    );
}
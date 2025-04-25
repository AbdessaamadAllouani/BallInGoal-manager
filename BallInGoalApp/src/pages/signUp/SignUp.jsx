import React, { useState } from 'react';
import logo from '../../assets/images/whiteLogo.png'
import { Link } from 'react-router-dom';
import glogo from '../../assets/images/g-logo.png';
import './signUp.css';
import SignIn from '../SignIn/SignIn';
export default function SignUp() {
    const [validate, setValidate] = useState({ form: true, anim: false })
    return (

        <div className='signup-container'>
            <div className='back-container'>
                <header>
                    <div className='container-img'>
                        <img src={logo} className='logo' alt="logo" />
                    </div>
                    {validate.form ? (
                        <button className='btn-connexion' onClick={() => setValidate({ form: false, anim: true })}>Connexion</button>
                    ) : (
                        <button className='btn-connexion' onClick={() => setValidate({ form: true, anim: false })}>inscrire</button>
                    )
                    }

                </header>
            </div>
            <div className='center-container'>
                <div className={validate.anim ? 'form-container anim' : 'form-container'}>
                    {validate.form ?
                        <span className='form-title'>Créer un compte</span> :
                        <span className='form-title'></span>
                    }
                    {validate.form ? (
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
                        </form>) : (
                        <SignIn />
                    )}
                </div>
            </div>
        </div>
    );
}
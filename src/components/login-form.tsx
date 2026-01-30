'use client'
import {useState} from "react";
import {redirect} from "next/navigation";
import {login} from "@/lib/auth";

export default function LoginForm({redirectUrl}: {redirectUrl: string}) {
    const [errorMessage, setErrorMessage] = useState(null);

    async function tryLogin(event: React.FormEvent<HTMLFormElement>) {
        console.log('tryLogintryLogintryLogin')
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const res = await login(
            formData.get('_username') as string,
            formData.get('_password') as string
        );

        if (!res || res.error) {
            setErrorMessage(res?.error || 'Erreur inconnue lors du traitement du formulaire');
        } else {
            redirect(redirectUrl);
        }
    }

    return (
        <form className="form-signin" method="post" onSubmit={tryLogin}>
            <p className="error-messages">{errorMessage}</p>

            <label htmlFor="_username" className="sr-only">Login</label>
            <input type="text"
                   id="_username"
                   name="_username"
                   className="form-control"
                   placeholder="Username"
                   required
                   autoFocus/>

            <label htmlFor="_password" className="sr-only">Mot de passe</label>
            <input type="password"
                   id="_password"
                   name="_password"
                   className="form-control"
                   placeholder="Password"
                   required/>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Se connecter</button>
        </form>
    );
}
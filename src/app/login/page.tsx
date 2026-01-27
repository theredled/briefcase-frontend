
import {callApi} from "@/lib/api-client";
//import {useAuth} from "@/providers/AuthContext";
import {login} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function LoginPage({searchParams}: {searchParams: Promise<{redirectUrl ?: string}>}) {
    const {redirectUrl = "/"} = await searchParams;
    console.log(redirectUrl)
    // https://www.youtube.com/watch?v=DJvM2lSPn6w


    async function tryLogin(formData: FormData) {
        'use server'
        const res = await login(formData.get('_username') as string, formData.get('_password') as string);
        /*if (res)
            console.log('connection ok');
        else
            console.log('connection NOK');*/
        redirect(redirectUrl);
    }

    return (
        <section className="section-block page-section">
                    <h2 className="section-h2">Connexion</h2>

                    <div className="section-content">
            <form className="form-signin" action={tryLogin}>

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

        </div>
        </section>

    );
}
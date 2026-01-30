
import LoginForm from "@/components/login-form";

export default async function LoginPage({searchParams}: { searchParams: Promise<{ redirectUrl?: string }> }) {
    const {redirectUrl = "/"} = await searchParams;
    console.log(redirectUrl)

    // https://www.youtube.com/watch?v=DJvM2lSPn6w

    return (
        <section className="section-block page-section">
            <h2 className="section-h2">Connexion</h2>

            <div className="section-content">
                <LoginForm redirectUrl={redirectUrl} />
            </div>
        </section>
    );
}
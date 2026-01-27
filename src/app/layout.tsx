import type {Metadata} from "next";
import "./globals.css";
import Link from "next/dist/client/link";
import {isLoggedIn, logout} from "@/lib/auth";


export const metadata: Metadata = {
    title: "Briefcase",
    description: "Briefcase, file sharing. Share your files from everywhere.",
    icons: ["/favicon.ico"]
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    let userButtons;
    if (await isLoggedIn()) {
        userButtons = <form action={logout}>
            <button><i className="fa fa-sign-out" title="Se déconnecter"></i></button>
                </form>
    }
    else {
        userButtons = <Link href="/login?redirect=/">
                    <i className="fa fa-sign-in" title="Se connecter"></i>
                </Link>;
    }

    return (
        <html>
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

        </head>
        <body>

        <div id="global">

            <div id="header">
                <h1>Briefcase</h1>
            </div>

            <div id="content">
                <nav className="user-menu">
                    {userButtons}
                </nav>
                {children}
            </div>

            <section id="footer">
                <p>
                    <a href="https://github.com/theredled/briefcase">View project on Github</a>
                    - <a href="http://portfolio.fairytalesinyoghourt.fun">My master&apos;s portfolio</a>
                    - <span>Contact : benoit dot guchet [at] gmail.com</span>
                    - <a href="https://linktr.ee/fairytalesinyoghourt">La muzzica</a>
                </p>
            </section>
        </div>
        </body>
        </html>

    );
}
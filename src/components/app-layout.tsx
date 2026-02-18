import {isLoggedIn, logout} from "@/lib/auth";
import Link from "next/dist/client/link";
import {Briefcase} from "@/types/briefcase";
import {fetchCurrentBriefcase} from "@/lib/model";
import {SearchProvider} from "@/search-context";
import {SearchBar} from "@/components/search-bar";

export default async function AppLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    let userButtons;
    const briefcase: Briefcase = await fetchCurrentBriefcase();

    if (await isLoggedIn()) {
        userButtons = (<>
            <li>
                <Link href={process.env.ADMIN_URL as string}>
                    <i className="fa fa-user-cog" title="Admin"></i>
                    <span className="btn-label">Admin</span>
                </Link>
            </li>
            <li>
                <form action={logout}>
                    <button>
                        <i className="fa fa-sign-out" title="Se déconnecter"></i>
                        <span className="btn-label">Se déconnecter</span>
                    </button>
                </form>
            </li>
        </>);
    } else {
        userButtons = <Link href="/login?redirect=/">
            <span className="btn-label">Se connecter</span>
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
            <SearchProvider>
                <div id="header">
                    <h1>Briefcase</h1>
                    <nav id="header-menu">
                        <div className="header-menu-left">
                            <SearchBar />
                        </div>
                        <div className="header-menu-center">
                            <h2 className="briefcase-title">{briefcase.name}</h2>
                        </div>
                        <div className="header-menu-right">
                            {userButtons}
                        </div>
                    </nav>
                </div>

                <div id="content">
                    {children}
                </div>
            </SearchProvider>
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
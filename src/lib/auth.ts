'use server'
import {cookies} from 'next/headers'

function findDomainName(url: string) {
    const urlObject = URL.parse(url);
    let domainName;
    //-- Ip v4
    if (urlObject?.hostname.match(/^\d+\.\d+\.\d+\.\d+$/))
        domainName = urlObject.hostname;
    else
        domainName = urlObject?.hostname.split('.').slice(-2).join('.');
    console.log(urlObject, domainName)
    return domainName;
}

export async function login(email: string, password: string) {
    const url = process.env.API_URL + '/login_check';
    const domainName = process.env.COMMON_DOMAIN_NAME; //findDomainName(url);

    if (!domainName) {
        throw new Error('No domain name found');
    }

    //console.log('login url : ', url);
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: email, password: password})
        });

        //console.log('login response : ', res);
        const data = await res.json();
        //console.log('login data : ', data);

        if (data?.code && data?.message)
            return {
                error: data.message,
            };
        if (res && res.status !== 200)
            throw new Error(`Erreur de connexion : ${res.status} ${res.statusText}`);

        if (data.token) {
            const cookieStore = await cookies()
            cookieStore.set('jwt_token', data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                domain: '.' + domainName,
                maxAge: 3600 // 1h
            })

            if (data.refresh_token) {
                cookieStore.set('refresh_jwt_token', data.refresh_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    domain: '.' + domainName,
                    maxAge: 604800 // 7 jours
                })
            }
        }

        return data;
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : new Error('Unknown error');
        console.log('login failed:', e);
        return {
            error: errorMessage,
        };
    }


}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('jwt_token')
    cookieStore.delete('refresh_jwt_token')
}

export async function getAuthToken() {
    const cookieStore = await cookies()
    return cookieStore.get('jwt_token')?.value
}

export async function isLoggedIn() {
    return !!(await getAuthToken());
}
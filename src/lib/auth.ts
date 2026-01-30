'use server'
import {cookies} from 'next/headers'

export async function login(email: string, password: string) {
    const url = process.env.API_URL + '/login_check';
    console.log('login url : ', url);
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: email, password: password})
        });

        console.log('login response : ', res);
        const data = await res.json();
        console.log('login data : ', data);

        if (data?.code && data?.message)
            return {
                error: data.message,
            };
        if (res && res.status !== 200)
            throw new Error(`Erreur de connexion : ${res.status} ${res.statusText}`);

        if (data.token) {
            const cookieStore = await cookies()
            cookieStore.set('token', data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600 // 1h
            })

            if (data.refresh_token) {
                cookieStore.set('refresh_token', data.refresh_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
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
    cookieStore.delete('token')
    cookieStore.delete('refresh_token')
}

export async function getAuthToken() {
    const cookieStore = await cookies()
    return cookieStore.get('token')?.value
}

export async function isLoggedIn() {
    return !!(await getAuthToken());
}
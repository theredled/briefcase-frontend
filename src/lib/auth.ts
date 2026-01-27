'use server'
import {cookies} from 'next/headers'

export async function login(email: string, password: string) {

    const res = await fetch(process.env.API_URL + '/login_check', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: email, password})
    })/*.then(async(resp: Response) => {
        const data = await resp.json();
        //await AsyncStorage.setItem('token', data.token);
        //await AsyncStorage.setItem('user', JSON.stringify({email: email}));
        authLogin({email: email}, data.token);
        Alert.alert('Connexion réussie', `Bienvenue ${email}`);
        navigation.navigate('Index');
    }).catch(() => {
        Alert.alert('Erreur', 'Identifiants incorrects');
    });*/

    const data = await res.json()

    console.log('login : ', data);
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

    return data
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
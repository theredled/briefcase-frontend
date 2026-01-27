'use server'

import {cookies} from 'next/headers'
import {getAuthToken} from "@/lib/auth";


export async function callApi(endpoint: string, options?: any) {
    const token = await getAuthToken();

    const url = `${process.env.API_URL}/${endpoint}`;
    console.log('callApi : ', url);

    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && {Authorization: `Bearer ${token}`}),
            ...options?.headers
        }
    })
    /*
    // Gérer le refresh si 401
    if (res.status === 401) {
        const refreshed = await refreshToken()
        if (refreshed) {
            // Retry la requête avec le nouveau token
            const newToken = (await cookies()).get('token')?.value
            return fetch(`https://api.example.com${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(newToken && {Authorization: `Bearer ${newToken}`}),
                    ...options.headers
                }
            })
        }
    }
    */

    return res.json()
}

/*
async function refreshToken() {
  const cookieStore = await cookies()
  const refresh = cookieStore.get('refresh_token')?.value

  if (!refresh) return false

  try {
    const res = await fetch('https://api.example.com/api/token/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refresh })
    })

    const data = await res.json()

    if (data.token) {
      cookieStore.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      return true
    }
  } catch (error) {
    console.error('Refresh token failed:', error)
  }

  return false
}

 */
import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

let cookies = parseCookies()


export const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        Authorization: `Bearer ${cookies['nextauth.token']}`
    }
})

api.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    if (error.response.status === 401) {
        console.log("deu erro")
        console.log(error.response)
        if ((error.response.data as any).code === 'token.expired') {
            cookies = parseCookies();

            const { 'nextauth.refreshToken': refreshToken } = cookies;

            api.post('/refresh', {
                refreshToken,
            }).then(response => {
                const { token } = response.data;

                setCookie(undefined, 'nextauth.token', token, {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/'
                })

                setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/'
                })

                api.defaults.headers['Authorization'] = `Bearer ${token}`
            })
        } else {

        }
    }
})
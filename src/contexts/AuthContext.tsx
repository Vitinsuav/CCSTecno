import { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { api } from "../services/apiClient";

type User = {
    email: string,
    permissions: string[],
    roles: string[],
}

type signInCredentials = {
    email: string,
    password:string,
}

type AuthContextData = {
    signIn: (credentials: signInCredentials) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
    user: User;

}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChanel:BroadcastChannel

export function signOut(){
    destroyCookie(undefined, 'nextauth.token')
    destroyCookie(undefined, 'nextauth.refreshToken')

    authChanel.postMessage('signOut')

    Router.push('/')
}

export function AuthProvider({children} : AuthProviderProps){

    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user

    useEffect(() => {
        authChanel = new BroadcastChannel('auth') //declarado dentro da função pq nao funciona pelo lado so servidor
        authChanel.onmessage = (message) => {
            switch(message.data){
                case 'signOut': //mensagem recebida pelo broadcast entre abas
                    Router.push('/');
                    break;
                case "signIn": 
                    window.location.replace("http://localhost:3000/dashboard");
                    break;
                default: 
                    break;
            } //logout de todas as abas do app
        }
    }, [])

    useEffect(() => {
        const {'nextauth.token': token} = parseCookies()
        if(token) {
            api.get('/me').then(response => {
                const { email, permissions, roles} = response.data
                setUser({email, permissions, roles})
            }).catch(e => {
                signOut()
                console.log(e)
            }) //rota me traz dados do user
        }
    }, [])

    async function signIn({email, password} : signInCredentials){
        try {
        const response = await api.post('/sessions', {
            email,
            password,
        })
        const { token, refreshToken, permissions, roles } = response.data
        
        setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 24* 30,  //tempo de armazenamento do cookie no server(30dias)
            path: '/' //caminhos com acesso aos cookies
        })//undef pq execução é pelo lado do browser
        setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
            maxAge: 60 * 60 * 24* 30,
            path: '/'
        })//undef pq execução é pelo lado do browser

        setUser({
            email,
            permissions,
            roles
        })

        api.defaults.headers = `Bearer ${token}`

        authChanel.postMessage("signIn");

        Router.push('/dashboard')

        } catch(e){
            console.log(e)
        }
    }
    return(
        <AuthContext.Provider value={{signIn, signOut, isAuthenticated, user}}>
            {children}
        </AuthContext.Provider>
    )
}
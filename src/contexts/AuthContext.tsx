import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api';
import Router  from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

type SignInCredentials = {
    login: string,
    password: string,
}

type AuthContextData = {
    SignIn(credentials: SignInCredentials): Promise<void>;
    user: User
    isAuthenticated: boolean,
}

type AuthProviderProps = {
    children: ReactNode;
}

type User = {   
    email: string,
    id: number,
    name:string,
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }){

    const [user, setUser] = useState<User>();

    const isAuthenticated = !!user

    useEffect(() => {
        const { 'nextauth.token': token} = parseCookies() 
        if(token){
            //api.get() rota que retorna os dados dos user para que ele tenha salvo no estado
        }
    }, [])

    async function signIn({login, password}: SignInCredentials){
        try { 
            
            const response = await api.post('Auth/signIn', {
            login,
            password
            })

            const { token, user } = response.data
            const { email, name, id} = user

            setCookie(undefined, 'nextauth.token', token,{
                maxAge: 60 * 60 * 24, 
                path: '/',
            })

            setUser({
                email,
                id,
                name
            })
        
        api.defaults.headers['Authorization'] = `Bearer ${token}`

        Router.push('/dashboard')

        console.log(user)

        } catch(e){
            console.log(e)
        }
    }
    
    return (
        <AuthContext.Provider value={{signIn, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
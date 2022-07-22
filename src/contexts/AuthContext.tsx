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
    user: User;
    isAuthenticated: boolean;
    mes:string;
    ano:string;
    Datar(dates: Dates): void;
}

type AuthProviderProps = {
    children: ReactNode;
}

type User = {   
    email: string,
    id: number,
    name:string,
}

type Dates = {   
    mes: string;
    ano: string;
}

type Ms = {
    ms: number
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children } : AuthProviderProps){

    const [ mes, setMes] = useState('')
    const [ ano, setAno] = useState('')

    function Datar({mes, ano} : Dates){
        setMes(mes)
        setAno(ano)
    }

    const [user, setUser] = useState<User>({} as User);

    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {
        const { 'nextauth.token': token} = parseCookies() 
        if(token){
            setisAuthenticated(true)
        } else{
            setisAuthenticated(false)
        }
    }, [])


    async function SignIn({login, password}: SignInCredentials){
        try { 
            
            const response = await api.post('Auth/signIn', {
            login,
            password
            });

            const { token, user } = response.data;
            const { email, name, id} = user;

            setCookie(undefined, 'nextauth.token', token,{
                maxAge: 60 * 60 * 24, 
                path: '/',
            });

            setUser({
                email,
                id,
                name
            });
         
        api.defaults.headers.common['Authorization'] = `Bearer ${token.toString()}`;      
        
        Router.push('/dashboard')
        

        } catch(e){
            console.log(e)
        }
    }
    
    return (
        <AuthContext.Provider value={{SignIn, user, isAuthenticated, mes, ano, Datar}}>
            {children}
        </AuthContext.Provider>
    )
}
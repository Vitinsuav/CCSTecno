import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let failedRequestsQueue = []

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['nextauth.token']}`
        }   
    })
    
    api.interceptors.response.use(response => {
        return response //o que fazer caso a resposta de certo
    }, (error: AxiosError) => {
        if(error.response?.status === 401){
            if(error.response.data?.code === 'token.expired'){
                cookies = parseCookies(ctx)
    
                const{'nextauth.refreshToken' : refreshToken} = cookies;
                const originalConfig = error.config
    
                if(!isRefreshing){
                    isRefreshing = true
    
                    api.post('refresh', {
                        refreshToken,
                    }).then(response => { 
                        const { token } = response.data
                    
        
                    setCookie(ctx, 'nextauth.token', token, {
                        maxAge: 60 * 60 * 24* 30,  //tempo de armazenamento do cookie no server(30dias)
                        path: '/' //caminhos com acesso aos cookies
                    })//undef pq execução é pelo lado do browser
                    setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
                        maxAge: 60 * 60 * 24* 30,
                        path: '/'
                    })//undef pq execução é pelo lado do browser
        
                    api.defaults.headers = `Bearer ${token}`
    
                    failedRequestsQueue.forEach(request => request.resolve(token))
                    failedRequestsQueue = [];
    
                }).catch(e => {
                    failedRequestsQueue.forEach(request => request.reject(e))
                    failedRequestsQueue = [];
                    if(process.browser){// verifica se o cod esta no browser ou server
                        signOut()
                    } else{
                        return Promise.reject(new AuthTokenError())
                    }
                }).finally(() => {
                    isRefreshing = false;
                })
                }
    
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        resolve: (token: string) => {
                            originalConfig.headers['Authorization'] = ` Bearer ${token}`
                            resolve(api(originalConfig)) // aguarda para que seja executado
                        }, //caso tenha sucesso
                        reject: (error: AxiosError) => {
                            reject(error)
                        }, //caso falhe
                    })
                })
    
            } else{
                if(process.browser){// verifica se o cod esta no browser ou server
                    signOut()
                }else{
                    return Promise.reject(new AuthTokenError())
                }
            }
        }
        return Promise.reject(error)
    })
    return api;
}

//usar mesmo arquivo para as aplicações
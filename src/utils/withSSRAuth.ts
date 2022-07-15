//paginas so para visitantes ou nao logados
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenError } from "../services/errors/AuthTokenError"
import decode from 'jwt-decode'
import { validateUserPermissions } from "./validateUserPermissions"

type WithSSRAuthOptions = {
  permissions?: string[],
  roles?: string [],
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?:WithSSRAuthOptions){
  return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['nextauth.token']

    if (!token){
        return {
            redirect: {
            destination: '/',
            permanent: false
            }
        }
    }

    try{ 
      return await fn(ctx)
    } catch(e){
        if(e instanceof AuthTokenError){
          destroyCookie(ctx, 'nextauth.token')
          // tratativa de erros no server ou backend
          return {
            redirect:{
              destination: '/',
              permanent: false
            }
          }
        }
      }
  }

}
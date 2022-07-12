import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()

export const api = axios.create({
    baseURL: 'http://dev4ccstecno.megaerp.online:5900/api/',
    headers: {
        Authorization: `Bearer ${cookies['nextauth.token']}`
    }
})
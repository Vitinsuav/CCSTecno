import { createContext, ReactNode, useEffect, useState } from 'react'
import Router  from 'next/router'

type AuthProviderProps = {
    children: ReactNode;
}

export const DateContext = createContext({})

export function DateProvider({ children } : AuthProviderProps){
    
    const sla = "oi"
    
    return (
        <DateContext.Provider value={{sla}}>
            {children}
        </DateContext.Provider>
    )
}
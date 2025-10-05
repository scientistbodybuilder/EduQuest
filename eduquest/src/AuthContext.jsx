import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "./utils/supabaseClient"
const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)

    

    useEffect(()=> {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    },[])


    const oAuth = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/`,
          },
        });
    
        if (error) console.error('Login error:', error);
      };

    return( <AuthContext.Provider value={{ session, oAuth }}>
                {children}
            </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
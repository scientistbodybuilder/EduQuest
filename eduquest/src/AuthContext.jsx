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

    // const initUser = async (email, name) => {
    //     const { data, error } = await supabase.from('profiles').select('*').eq('email',email)
    //     if (!data) {
    //         // initialize the user
    //         const d = new Date().toISOString().split('T')[0]
    //         console.log('date of creation: ',d)
    //         const { initError } = await supabase.from('profiles').insert({
    //             'email': email,
    //             'full_name': name,
    //             'created_at': d
    //         })
    //         if (initError.error) {
    //             console.error('Error initializing user in profiles table: ', initError.error)
    //         } else {
    //             console.log('Profile initialized successfully')
    //         }
    //     }
    // }


    const oAuth = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/`,
          },
        });
    
        if (error) console.error('Login error:', error);

        // const { data: { session }, errorObj } = await supabase.auth.getSession();
        //     if (errorObj.error) console.error(errorObj.error);
        //     if (session) {
        //         console.log('User:', session.user); 
                
        //         // await initUser(session.user?.email, session.user?.user_metadata.name)
        //     }
      };

    return( <AuthContext.Provider value={{ session, oAuth }}>
                {children}
            </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
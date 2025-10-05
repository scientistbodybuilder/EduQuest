import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "./utils/supabaseClient"
const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)

    useEffect(()=> {
        // get current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session?.user) {
              initUser(session.user)
            }
        })

        // listen for changes to auth state
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session?.user) {
              initUser(session.user)
            }
        })
    },[]);

    const initUser = async (user) => {

      try {
        const { id, email, user_metadata} = user;
        const name = user_metadata?.name || 'No Name';

        const { data: existingUser, error: findError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (findError && findError.code !== "PGRST116") throw findError;

        // if first time logging in, create profile in "profiles" table
        if (!existingUser) {

          const createdAt = new Date().toISOString();
          const { data: newUser, error: insertError } = await supabase
              .from('profiles')
              .insert({
                  id,
                  email,
                  full_name: name,
                  created_at: createdAt,
              });
  
          if (insertError) {
              throw insertError;
          }
          console.log("New user added:", email);
        }
        else {
          console.log("User already exists:", email);
        }

      }
      catch (error) {
        console.error('Error initializing user in profiles table: ', error)
      }
    };


    const oAuth = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/`,
          },
        });
    
        if (error) console.error('Login error:', error);
      };

      const signOut = async () => {
        setSession(null)
        const { error } = await supabase.auth.signOut()

        if (error) {
          console.error('Error signing out:', error)
        } else {
          window.location.href = "/login" // or use React Router's navigate
        }
      }

    return( <AuthContext.Provider value={{ session, oAuth, signOut }}>
                {children}
            </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
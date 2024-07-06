import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Session } from "@supabase/supabase-js";
type Authdata={
    session:Session|null,
    profile:any,
    loading:boolean,
    isAdmin:boolean


};

const AuthContext=createContext<Authdata>({
    session:null,
    loading:true,
    profile:null,
    isAdmin:false
});

export default function AuthProvider({children}:PropsWithChildren){
const [session,setSession]=useState<Session |null>(null);
const[profile,setProfile]=useState();
const [loading,setLoading]=useState(true)

useEffect(()=>{
    const fetchSession=async()=>{
       const {data:{session}}=   await supabase.auth.getSession()
         console.log(session)
         setSession(session)
         setLoading(false)

         if (session) {
            // fetch profile
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setProfile(data || null);
            console.log(profile)
          }

    }
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      })
},[])



    return(
        <AuthContext.Provider value={{session,loading,profile,isAdmin:profile?.group==='Admin'}}>
            {children}
        </AuthContext.Provider>
    )
}export const useAuth=()=>useContext(AuthContext)
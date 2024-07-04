import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Session } from "@supabase/supabase-js";
type Authdata={
    session:Session|null
};

const AuthContext=createContext<Authdata>({
    session:null
});

export default function AuthProvider({children}:PropsWithChildren){
const [session,setSession]=useState<Session |null>(null);
useEffect(()=>{
    const fetchSession=async()=>{
       const {data,error}=   await supabase.auth.getSession()
         console.log(data)
         setSession(data.session)
    }
    fetchSession();
},[])



    return(
        <AuthContext.Provider value={{session}}>
            {children}
        </AuthContext.Provider>
    )
}
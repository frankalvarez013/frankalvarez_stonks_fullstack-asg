'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link'
export default function Streaming({ params }: { params: { username: string, lng: string } }){
    let userData = null;
    useEffect(()=>{
        async function retrieveSession(){
            const supabase = createClient();
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching notes:', error);
                return <pre>Error fetching notes: {error.message}</pre>;
            }
            userData = data;
        }
        retrieveSession();
    },[])
    console.log(userData);
    if(userData == null){
        return(
            <>
            <h1>Not Connected broski !</h1>
            <Link href={`/${params.lng}`}>
            second page
          </Link>
            </>

        )
    }
    return(
        <>
                <h1>Hi {params.username}!</h1>
        <Link href={`/${params.lng}`}>
        second page
      </Link>
        </>

    )
}
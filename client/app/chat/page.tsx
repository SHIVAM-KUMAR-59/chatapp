'use client'
import { useSession } from 'next-auth/react';
import React from 'react'

const Page = () => {
    const { data: session, status } = useSession();
    console.log("Session data:", session);
    
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        return <div>Please log in to access the chat.</div>;
    }
  return (
    <p>ncsljdn</p>
  )
}

export default Page
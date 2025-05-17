"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

function LogoutButton() {
    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const handleLogOut = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const errorMessage = null;

        if (!errorMessage) {
            toast.success("Logged Out", {
                description: "You have been successfully logged out",
            })
            router.push("/")
        } else {
            toast.error("Error", {
                description: "An error occurred while logging out",
                unstyled: false,
            })
        }

        console.log("logging out");
        setLoading(false)
    }


    return (
        <Button
            onClick={handleLogOut}
            variant="outline"
            className='w-24'
        > {loading ? <Loader2 className='animate-spin' /> : "Log Out"} </Button>
    )
}

export default LogoutButton
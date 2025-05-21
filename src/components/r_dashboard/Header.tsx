import { Button } from '@/components/ui/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Plus } from 'lucide-react'
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface HeaderProps {
    onNewNote: () => void;
}

function Header({ onNewNote }: HeaderProps) {
    return (
        <header className='p-4 right-0  border-b  flex items-center top-0 bg-background z-10'>
            <SidebarTrigger />
            <div className='container mx-auto flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Notes</h1>
                <div className='flex gap-4 items-center'>
                    <LogoutLink className='hover:text-primary'>Log out</LogoutLink>
                    <Button onClick={onNewNote} size="sm" className='cursor-pointer'>
                        <Plus className='size-4 mr-2' /> New Note
                    </Button>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header >
    )
}

export default Header
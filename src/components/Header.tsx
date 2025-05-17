"use client"

import logo from '/LunarNoteIco/favicon-96x96.png'
import { shadow } from '@/styles/utils';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'; // Assuming you're using lucide-react for icons
import LogoutButton from './LogoutButton';
import { Button } from './ui/button';

function Header() {
    const user = 1;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className='relative flex h-24 w-full items-center justify-between bg-popover px-6 md:px-12'
            style={{
                boxShadow: shadow,
            }}
        >
            <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-3">
                    {/* <Image
                        alt="Lunar Note"
                        height={60}
                        width={60}
                        className='rounded-full transition-transform hover:scale-105'
                        src={logo}
                        priority
                    /> */}
                    <span className="hidden text-xl font-bold text-primary md:block">Lunar Note</span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            {/* <nav className="hidden md:block">
                <ul className="flex space-x-8">
                    <li><Link href="/dashboard" className="text-md hover:text-primary transition-colors">Dashboard</Link></li>
                    <li><Link href="/notes" className="text-md hover:text-primary transition-colors">Notes</Link></li>
                    <li><Link href="/calendar" className="text-md hover:text-primary transition-colors">Calendar</Link></li>
                    <li><Link href="/settings" className="text-md hover:text-primary transition-colors">Settings</Link></li>
                </ul>
            </nav> */}

            {/* User Actions */}
            <div className="items-center space-x-4 md:flex">
                {user ? (
                    <LogoutButton />
                ) : (
                    <>
                        <Button asChild>
                            <Link href="/sign-up" className='hidden sm:block'>Sign Up</Link>
                        </Button>
                        <Button asChild variant='outline'>
                            <Link href="/login" className='hidden sm:block'>Login</Link>
                        </Button>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="text-foreground md:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            {/* {isMenuOpen && (
                <div className="absolute left-0 top-24 z-50 w-full bg-popover p-6 md:hidden" style={{ boxShadow: shadow }}>
                    <nav className="flex flex-col">
                        <ul className="flex flex-col space-y-4">
                            <li><Link href="/dashboard" className="text-lg hover:text-primary" onClick={toggleMenu}>Dashboard</Link></li>
                            <li><Link href="/notes" className="text-lg hover:text-primary" onClick={toggleMenu}>Notes</Link></li>
                            <li><Link href="/calendar" className="text-lg hover:text-primary" onClick={toggleMenu}>Calendar</Link></li>
                            <li><Link href="/settings" className="text-lg hover:text-primary" onClick={toggleMenu}>Settings</Link></li>
                        </ul>
                        <div className="mt-6 flex flex-col space-y-3">
                            <Link
                                href="/login"
                                className="rounded-full border border-primary px-4 py-2 text-center font-medium text-primary"
                                onClick={toggleMenu}
                            >
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-full bg-primary px-4 py-2 text-center font-medium text-primary-foreground"
                                onClick={toggleMenu}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </nav>
                </div>
            )} */}
        </header>
    )
}

export default Header
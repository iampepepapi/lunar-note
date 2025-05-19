"use client"

import logo from '/LunarNoteIco/favicon-96x96.png'
import { shadow } from '@/styles/utils';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X, MoonStar } from 'lucide-react'; // Added NotebookPen icon
import LogoutButton from './LogoutButton';
import { Button } from './ui/button';
import { ModeToggle } from './ui/theme-toggle';

function Header() {
    // For testing - replace with actual auth check
    const user = 1;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className='sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm transition-all md:h-20 md:px-6 lg:px-10'
            style={{
                boxShadow: shadow,
            }}
        >
            <div className="flex items-center space-x-2">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <MoonStar className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold text-foreground transition-colors hover:text-primary">
                        Lunar Note
                    </span>
                </Link>
            </div>

            {/* Center navigation - uncomment when needed */}
            {/* <nav className="hidden lg:block">
        <ul className="flex items-center space-x-6">
          <li>
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/notes" 
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Notes
            </Link>
          </li>
          <li>
            <Link 
              href="/calendar" 
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Calendar
            </Link>
          </li>
        </ul>
      </nav> */}

            {/* User Actions */}
            <div className="flex items-center space-x-3">
                <ModeToggle />

                {user ? (
                    <LogoutButton />
                ) : (
                    <>
                        <Button asChild variant="outline" className="hidden sm:inline-flex" size="sm">
                            <Link href="/login">
                                Log in
                            </Link>
                        </Button>
                        <Button asChild className="hidden sm:inline-flex" size="sm">
                            <Link href="/sign-up">
                                Sign up
                            </Link>
                        </Button>
                    </>
                )}

                {/* Mobile menu button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={toggleMenu}>
                    <div
                        className="absolute right-0 top-0 h-screen w-full bg-background p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="flex flex-col">
                            <div className="mb-8 flex items-center">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                    <MoonStar className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-lg font-semibold text-foreground">Lunar Note</span>
                            </div>

                            {!user ? (
                                <div className="flex flex-col gap-3">
                                    <Button asChild className="w-full" size="sm">
                                        <Link href="/sign-up">Sign up</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="w-full" size="sm">
                                        <Link href="/login">Log in</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="mb-6 flex items-center justify-between rounded-lg bg-muted p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-foreground">Test User</span>
                                        <span className="text-xs text-muted-foreground">user@example.com</span>
                                    </div>
                                    <LogoutButton />
                                </div>
                            )}

                            <div className="my-6 h-px bg-border" />

                            {/* Navigation items */}
                            <div className="flex flex-col space-y-1">
                                <Link
                                    href="/dashboard"
                                    className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                                    onClick={toggleMenu}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/notes"
                                    className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                                    onClick={toggleMenu}
                                >
                                    Notes
                                </Link>
                                <Link
                                    href="/calendar"
                                    className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                                    onClick={toggleMenu}
                                >
                                    Calendar
                                </Link>
                            </div>

                            <div className="mt-auto">
                                <div className="flex items-center justify-between py-4">
                                    <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Lunar Note</span>
                                    {/* <ModeToggle /> */}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
"use client"

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

type Props = {
    type: "login" | "sign-up"
}
function AuthForm({ type }: Props) {
    const isLoginForm = type === "login";

    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData: FormData) => {
        console.log(FormData);
    };

    return (
        <form action={handleSubmit}>
            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        required
                        disabled={isPending}
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        required
                        disabled={isPending}
                    />
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex flex-col gap-6">
                {isPending ? (
                    <Button className="w-full" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isLoginForm ? "Logging in..." : "Signing up..."}
                    </Button>
                ) : isLoginForm ? (
                    <LoginLink className="w-full">
                        <Button className="w-full">Login</Button>
                    </LoginLink>
                ) : (
                    <RegisterLink className="w-full">
                        <Button className="w-full">Sign Up</Button>
                    </RegisterLink>
                )}

                <p className="text-xs">
                    {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
                    {isLoginForm ? (
                        <RegisterLink className={`text-primary underline ${isPending ? "pointer-events-none opacity-50" : ""}`}>
                            Sign Up
                        </RegisterLink>
                    ) : (
                        <LoginLink className={`text-primary underline ${isPending ? "pointer-events-none opacity-50" : ""}`}>
                            Login
                        </LoginLink>
                    )}
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthForm
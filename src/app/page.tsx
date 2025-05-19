"use client";

import React from "react";
import { motion } from "framer-motion";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight, Calendar, MoonStar, PenLine } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-24 md:py-32">
        {/* Background gradient - improved for light mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-0"></div>

        {/* Floating elements for visual interest - modified for better light mode visibility */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-primary/20 dark:bg-primary/10 blur-3xl"></div>
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/30 dark:bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-secondary/30 dark:bg-secondary/20 blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Capture your ideas with{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Lunar Note
                </span>
              </h1>
              <p className="mb-10 text-xl text-foreground/80 dark:text-muted-foreground">
                Organize thoughts, capture inspiration, and boost your productivity with our beautiful and intuitive note-taking app.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <RegisterLink>
                <Button size="lg" className="group">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </RegisterLink>
              <LoginLink>
                <Button size="lg" variant="outline">
                  Sign in
                </Button>
              </LoginLink>
            </motion.div>
          </div>

          {/* App screenshot/mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative w-full max-w-5xl overflow-hidden rounded-xl border bg-card shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 dark:from-primary/5 to-secondary/10 dark:to-secondary/5"></div>
              <Image
                src="/dashboard-preview.png"
                alt="Lunar Note Dashboard"
                width={1200}
                height={675}
                className="relative z-10 rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Designed for your thoughts</h2>
            <p className="mx-auto max-w-2xl text-foreground/80 dark:text-muted-foreground">
              Lunar Note brings together everything you need for seamless note-taking and organization.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 rounded-full bg-primary/15 p-3 w-fit">
                <PenLine className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-foreground">Elegant Note Editor</h3>
              <p className="text-foreground/75 dark:text-muted-foreground">
                Write beautifully formatted notes with our intuitive rich text editor.
                Support for markdown, code blocks, and more.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 rounded-full bg-primary/15 p-3 w-fit">
                <MoonStar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-foreground">Dark & Light Themes</h3>
              <p className="text-foreground/75 dark:text-muted-foreground">
                Easy on your eyes with beautiful light and dark themes that
                adapt to your system preferences.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 rounded-full bg-primary/15 p-3 w-fit">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-foreground">Calendar Integration</h3>
              <p className="text-foreground/75 dark:text-muted-foreground">
                Seamlessly organize your notes by date and set reminders for
                important tasks and events.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary/25 to-secondary/25 dark:from-primary/20 dark:to-secondary/20 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Ready to get started?</h2>
            <p className="mb-8 text-lg text-foreground/80 dark:text-muted-foreground">
              Join thousands of users organizing their ideas with Lunar Note.
              Start for free, no credit card required.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <RegisterLink>
                <Button size="lg" className="group">
                  Create your account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </RegisterLink>
              <LoginLink>
                <Button size="lg" variant="outline">
                  Sign in
                </Button>
              </LoginLink>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <MoonStar className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">Lunar Note</span>
            </div>
            <div className="text-sm text-foreground/70 dark:text-muted-foreground">
              © {new Date().getFullYear()} Lunar Note. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
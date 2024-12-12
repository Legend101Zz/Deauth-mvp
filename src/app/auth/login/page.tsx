"use client";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,125,5,0.1),rgba(0,0,0,1)_70%)]" />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-grid-pattern bg-white"
        />
      </div>

      {/* Rotating Logo */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-8 left-8 w-24 h-24 opacity-10"
      >
        <Image
          src="/deauthCircleIcon2.png"
          alt="Deauth Watermark"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        <div className="rounded-3xl bg-black/60 backdrop-blur-xl border border-accent/10 shadow-2xl">
          {/* Logo and Title Section */}
          <div className="flex flex-col items-center pt-12 pb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Image
                src="/deauthCircleIcon2.png"
                alt="Deauth Logo"
                width={80}
                height={80}
                className="drop-shadow-lg"
              />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-5xl text-accent font-heading1 text-center mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white/60 text-center"
            >
              Sign in to continue your creative journey
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="px-8 pb-12"
          >
            <LoginForm />

            {/* Sign Up Options */}
            <div className="mt-8 text-center">
              <p className="text-white/60 mb-4">Don't have an account?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors duration-300"
                >
                  Sign Up
                </Link>
                {/* <Link
                  href="/auth/signup/designer"
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors duration-300"
                >
                  Join as Designer
                </Link> */}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-6 text-white/40 text-sm"
        >
          Where Art Meets Apparel
        </motion.p>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Login;
//@ts-nocheck
"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordField = ({ register, errors, isLoading }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-0.5">
            <div className="relative group">
                <Input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                    disabled={isLoading}
                    type={showPassword ? "text" : "password"}
                    className="w-full h-8 text-white pr-12 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none outline-none placeholder:text-white/70 focus:ring-1 focus:ring-accent/50 transition-all duration-200"
                    placeholder="Password"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-accent transition-colors duration-200"
                >
                    {showPassword ? (
                        <EyeOffIcon className="w-4 h-4" />
                    ) : (
                        <EyeIcon className="w-4 h-4" />
                    )}
                </button>

                {/* Password strength indicator */}
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full transition-all duration-300 bg-accent" style={{
                        width: register?.password?.value?.length >= 6 ? '100%' :
                            register?.password?.value?.length >= 4 ? '66%' :
                                register?.password?.value?.length >= 2 ? '33%' : '0%'
                    }} />
                </div>
            </div>

            {errors.password && (
                <p className="text-sm text-red-500 font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errors.password.message as string}
                </p>
            )}
        </div>
    );
};

export default PasswordField;
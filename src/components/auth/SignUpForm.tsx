import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import AuthSignUpOverlay from "./AuthSignUpOverlay";
import PasswordField from './PasswordField';

const CreateAccountForm = () => {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm();
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const [loadingMessage, setLoadingMessage] = React.useState("Creating your account...");


	const onSubmit = async (data: any) => {
		try {
			setIsLoading(true);
			setError(null);
			setLoadingMessage("Creating your account...");

			// First create user account
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: data.clientName,
					email: data.email,
					password: data.password,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Signup failed');
			}


			// Update loading message for signin phase
			setLoadingMessage("Logging you in...");

			// Then sign in using credentials
			const signInResult = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (signInResult?.error) {
				throw new Error('Login failed after signup');
			}

			toast({
				title: "Welcome to Deauth!",
				description: "Your account has been created successfully.",
			});

			reset();
			router.push('/');

		} catch (error: any) {
			setError(error.message || 'An error occurred during signup');
			toast({
				title: "Error",
				description: error.message || "An error occurred during signup",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleAuth = async () => {
		try {
			setIsLoading(true);
			const result = await signIn('google', {
				callbackUrl: '/',
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Google authentication failed",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<AuthSignUpOverlay
				isLoading={isLoading}
				error={error}
				onErrorDismiss={() => setError(null)}
			/>


			<div className="w-full flex flex-col justify-center mx-auto">
				<div className="w-full flex items-center justify-center">
					<div className="px-6 py-4 w-[500px] flex flex-col justify-start">
						{/* Google Auth Button - Moved to top */}
						<button
							type="button"
							onClick={handleGoogleAuth}
							disabled={isLoading}
							className="w-full du-btn du-btn-secondary rounded-full px-10 py-2 bg-black/60 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
						>
							<FcGoogle className="text-2xl" />
							<span>Continue with Google</span>
						</button>

						{/* Separator */}
						<div className="flex items-center my-6">
							<div className="flex-1 border-t border-white/10"></div>
							<span className="px-4 text-sm text-white/60">or continue with email</span>
							<div className="flex-1 border-t border-white/10"></div>
						</div>


						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
							<div className="flex flex-col gap-0.5">
								<Input
									{...register("clientName", {
										required: "Username is required",
										minLength: {
											value: 2,
											message: "Username must be at least 2 characters"
										}
									})}
									disabled={isLoading}
									className="w-full h-8 text-white placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none outline-none placeholder:text-white/70"
									type="text"
									placeholder="Username"
								/>
								{errors.clientName && (
									<p className="text-sm text-red-500 font-semibold px-4">
										<span className="font-bold italic mr-1">!</span>
										{errors.clientName.message as string}
									</p>
								)}
							</div>

							<div className="flex flex-col gap-0.5">
								<Input
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address"
										}
									})}
									disabled={isLoading}
									className="w-full text-white h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none outline-none placeholder:text-white/70"
									type="email"
									placeholder="Email"
								/>
								{errors.email && (
									<p className="text-sm text-red-500 font-semibold px-4">
										<span className="font-bold italic mr-1">!</span>
										{errors.email.message as string}
									</p>
								)}
							</div>

							<PasswordField
								register={register}
								errors={errors}
								isLoading={isLoading}
							/>


							{/* <div className="flex flex-col gap-0.5">
								<Input
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 6,
											message: "Password must be at least 6 characters"
										}
									})}
									disabled={isLoading}
									className="w-full h-8 text-white placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none outline-none placeholder:text-white/70"
									type="password"
									placeholder="Password"
								/>
								{errors.password && (
									<p className="text-sm text-red-500 font-semibold px-4">
										<span className="font-bold italic mr-1">!</span>
										{errors.password.message as string}
									</p>
								)}
							</div> */}

							<div className="flex justify-center items-center w-full">
								<button
									type="submit"
									disabled={isLoading}
									className="du-btn du-btn-accent rounded-full px-10 py-2 min-w-[200px] hover:bg-accent/90 transition-colors"
								>
									{isLoading ? 'Creating Account...' : 'Sign Up'}
								</button>
							</div>
						</form>

						<div className="flex justify-center items-center w-full mt-4">
							<button
								type="submit"
								disabled={isLoading}
								className="du-btn du-btn-accent rounded-full px-10 py-2 min-w-[200px] hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Create Account
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateAccountForm;
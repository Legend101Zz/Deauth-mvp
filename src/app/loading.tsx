"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Loading = () => {
	const [progress, setProgress] = useState(0);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const initTimer = setTimeout(() => {
			setIsInitialized(true);
		}, 800);

		const progressTimer = setInterval(() => {
			setProgress(prev => prev >= 100 ? 100 : prev + 0.5);
		}, 30);

		return () => {
			clearTimeout(initTimer);
			clearInterval(progressTimer);
		};
	}, []);

	return (
		<div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
			{/* Luxury pattern background */}
			<div className="absolute inset-0 opacity-20">
				<div className="relative w-full h-full"
					style={{
						backgroundImage: `
              linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
              linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
              linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
              linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
              linear-gradient(60deg, rgba(255,125,5,0.1) 25%, transparent 25.5%, transparent 75%, rgba(255,125,5,0.1) 75%, rgba(255,125,5,0.1))
            `,
						backgroundSize: '80px 140px',
					}}
				/>
			</div>

			{/* Luxury ambient effects */}
			<div className="absolute inset-0">
				{/* Floating silk ribbons */}
				{Array.from({ length: 8 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-64 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							transform: `rotate(${Math.random() * 360}deg)`,
						}}
						animate={{
							y: [0, 30, 0],
							opacity: [0.1, 0.3, 0.1],
							scale: [1, 1.2, 1],
							rotate: [`${Math.random() * 360}deg`, `${Math.random() * 360 + 180}deg`],
						}}
						transition={{
							duration: 8 + Math.random() * 4,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			<div className="relative w-full max-w-4xl">
				{/* Main loader container */}
				<div className="relative h-48 flex items-center">
					{/* Luxury fabric runway */}
					<motion.div
						className="absolute w-full h-16 overflow-hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: isInitialized ? 1 : 0 }}
						style={{
							background: 'linear-gradient(to bottom, rgba(255,125,5,0.1), transparent)',
						}}
					>
						{/* Premium fabric texture */}
						<motion.div
							className="absolute inset-0"
							style={{
								backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    rgba(255,125,5,0.05) 0%,
                    rgba(255,125,5,0.05) 1%,
                    transparent 1%,
                    transparent 4%
                  )
                `,
								backgroundSize: '100px 100px',
							}}
						/>

						{/* Animated silk flow */}
						<motion.div
							className="absolute inset-0"
							style={{
								background: 'linear-gradient(90deg, transparent, rgba(255,125,5,0.2), transparent)',
								backgroundSize: '200% 100%',
							}}
							animate={{
								backgroundPosition: ['100% 0%', '-100% 0%'],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "linear",
							}}
						/>

						{/* Progress indicator */}
						<motion.div
							className="absolute h-full bg-gradient-to-r from-transparent via-accent/10 to-accent/20"
							style={{ width: `${progress}%` }}
							animate={{ width: `${progress}%` }}
						>
							{/* Luxury edge effect */}
							<motion.div
								className="absolute right-0 h-full w-32"
								style={{
									background: 'linear-gradient(90deg, transparent, rgba(255,125,5,0.3))',
								}}
								animate={{
									opacity: [0.3, 0.6, 0.3],
								}}
								transition={{
									duration: 1.5,
									repeat: Infinity,
								}}
							/>
						</motion.div>
					</motion.div>

					{/* Dinosaur with fashion treatment */}
					<div
						className="absolute z-50"
						style={{
							left: `${progress}%`,
							transform: 'translateX(-50%) scaleX(-1)',
							zIndex: 50  // Ensure dinosaur is above everything
						}}
					>

						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 1280 890"
							width="320"
							height="180"
							className="fill-white"
							animate={{
								y: [-2, 2, -2],
								rotate: [-1, 1, -1]
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						>
							<g transform="translate(0.000000,890.000000) scale(0.100000,-0.100000)">
								<motion.path
									d="M3323 5778 c-11 -13 -34 -44 -52 -69 -28 -39 -44 -51 -104 -74 -40
-15 -122 -47 -183 -71 -61 -24 -121 -44 -133 -44 -32 0 -660 116 -846 156
-224 49 -430 84 -490 84 -57 0 -57 0 -328 -247 -195 -178 -187 -166 -187 -278
0 -202 33 -485 76 -660 29 -118 99 -265 155 -329 45 -51 60 -56 80 -25 13 19
16 12 28 -76 7 -54 23 -129 36 -167 l23 -69 -34 -68 c-45 -88 -78 -220 -69
-275 4 -27 72 -156 208 -393 111 -193 211 -364 222 -379 21 -27 23 -27 175
-35 85 -4 223 -13 305 -19 185 -14 256 -7 310 30 22 15 96 60 165 100 69 40
264 156 434 258 l309 184 356 -39 c236 -27 365 -37 381 -31 14 4 41 28 60 52
39 49 63 56 197 56 41 0 83 4 93 10 10 5 101 123 201 262 101 139 219 300 263
358 137 180 306 421 312 445 9 35 1 51 -92 197 -47 73 -191 312 -321 530
l-236 397 -51 10 c-28 6 -163 31 -301 56 -244 46 -408 78 -748 150 -93 19
-174 35 -181 35 -7 0 -22 -10 -33 -22z m-2 -531 l42 -12 -98 -43 c-54 -23
-100 -40 -102 -38 -4 4 11 69 23 105 5 15 59 10 135 -12z m865 -151 c138 -30
206 -52 284 -91 183 -93 316 -232 381 -400 102 -261 39 -498 -199 -748 -126
-132 -323 -213 -561 -231 -137 -10 -142 1 -130 309 4 127 13 289 18 360 6 72
13 173 15 225 3 52 8 130 12 174 5 62 4 80 -7 87 -19 12 -72 11 -125 -2 -41
-11 -47 -10 -69 11 -52 49 -90 186 -79 284 l6 59 167 -6 c126 -4 195 -11 287
-31z m-1701 -487 c-4 -17 -8 -104 -8 -194 -2 -144 -4 -165 -21 -184 -10 -11
-22 -19 -26 -16 -4 2 -15 33 -25 67 -9 35 -31 91 -47 126 -16 34 -28 66 -26
71 2 5 31 43 66 85 67 82 98 98 87 45z m100 -11 c38 -30 55 -50 55 -66 0 -39
18 -62 49 -62 20 0 51 20 112 71 l84 72 140 -8 c77 -4 171 -10 209 -13 l68 -7
-54 -70 c-30 -38 -68 -91 -86 -116 l-31 -46 -108 -7 c-59 -4 -158 -16 -220
-26 l-112 -19 -30 29 c-39 40 -61 38 -116 -10 -25 -22 -48 -40 -51 -40 -7 0 3
336 10 349 11 18 23 13 81 -31z m-432 -82 c84 -92 109 -107 136 -82 10 9 21
16 24 16 11 0 49 -81 78 -169 l29 -84 -24 -28 c-22 -26 -24 -26 -29 -9 -3 11
-17 25 -31 31 -22 10 -29 9 -47 -7 -30 -27 -80 -116 -119 -212 l-34 -83 -44
44 -43 44 20 61 c29 86 28 98 -14 112 -30 10 -40 9 -60 -4 -28 -18 -76 -86
-121 -170 l-32 -59 -9 59 c-4 32 -7 128 -6 213 3 176 -5 154 119 309 60 76 89
99 119 101 6 1 45 -37 88 -83z m-577 -36 c1 0 19 -33 38 -74 43 -89 84 -136
120 -136 23 0 26 -4 26 -37 0 -53 27 -201 51 -277 16 -53 17 -69 8 -90 -7 -14
-15 -26 -19 -26 -4 0 -35 40 -69 90 -49 72 -61 97 -61 129 0 54 -7 69 -43 88
l-31 15 -45 -53 c-25 -29 -58 -67 -72 -83 l-26 -30 -13 54 c-7 30 -14 118 -17
195 l-4 140 40 63 41 62 36 -15 c20 -8 38 -15 40 -15z m-146 -447 c11 -53 10
-64 -3 -83 -15 -21 -16 -21 -25 -3 -16 30 -40 132 -52 226 -11 88 -11 89 17
133 l28 44 11 -128 c6 -70 17 -155 24 -189z m381 137 l-6 -145 -12 75 c-27
168 -27 169 -3 196 13 13 24 23 25 21 0 -1 -1 -67 -4 -147z"

								/>
							</g>
						</motion.svg>
					</div>


					{/* Luxury brand letters */}
					<div className="absolute w-full text-center -top-8 z-40">
						<div className="flex justify-center items-center gap-6">
							{"DEAUTH".split("").map((letter, index) => (
								<motion.div
									key={index}
									className="relative"
									initial={{ opacity: 0, y: 20 }}
									animate={{
										opacity: progress > (index + 1) * 15 ? 1 : 0,
										y: progress > (index + 1) * 15 ? 0 : 20,
									}}
									transition={{
										duration: 0.8,
										ease: [0.16, 1, 0.3, 1], // Custom bezier curve for luxury feel
									}}
								>
									{/* Luxury glow effects */}
									<motion.div
										className="absolute inset-0 blur-3xl -z-10"
										style={{
											background: 'radial-gradient(circle at center, rgba(255,125,5,0.2), transparent 70%)',
										}}
										animate={{
											opacity: [0.3, 0.6, 0.3],
											scale: [1, 1.2, 1],
										}}
										transition={{
											duration: 3,
											repeat: Infinity,
											ease: "easeInOut",
											delay: index * 0.2,
										}}
									/>
									<span className="text-7xl font-heading1 text-accent tracking-wider">
										{letter}
									</span>
								</motion.div>
							))}
						</div>
					</div>

					{/* Luxury progress indicator */}
					<motion.div
						className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
						initial={{ opacity: 0 }}
						animate={{
							opacity: isInitialized ? 1 : 0,
						}}
					>
						<motion.div
							className="flex flex-col items-center gap-4"
							animate={{
								opacity: [0.7, 1, 0.7],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<div className="text-accent/70 font-heading1 text-sm tracking-[0.3em]">
								LOADING COLLECTION
							</div>
							<div className="w-48 h-[1px] bg-accent/20 overflow-hidden">
								<motion.div
									className="h-full bg-gradient-to-r from-accent/40 via-accent/60 to-accent/40"
									style={{ width: `${progress}%` }}
								>
									<motion.div
										className="absolute top-0 right-0 h-full w-12"
										style={{
											background: 'linear-gradient(90deg, transparent, rgba(255,125,5,0.4))',
										}}
									/>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
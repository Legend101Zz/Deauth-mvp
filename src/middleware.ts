import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				console.log("authorization access token", token);

				return !!token;
			},
		},
		pages: {
			signIn: "/auth/login",
		},
	}
);

export const config = {
	matcher: ["/cart/:path*", "/user/:path*"],
};

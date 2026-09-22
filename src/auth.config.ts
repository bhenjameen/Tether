import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const secret =
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  process.env.JWT_SECRET ||
  "tether-production-secret-key-must-be-at-least-32-chars-long-xyz-123";

if (!process.env.AUTH_SECRET) {
  process.env.AUTH_SECRET = secret;
}

export default {
  secret,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
} satisfies NextAuthConfig;


import { CredentialsConfig } from "next-auth/providers/credentials";
import type { Adapter } from "next-auth/adapters"
import { OAuthConfig } from "next-auth/providers/oauth";
import { GoogleProfile } from "next-auth/providers/google";
import { GithubProfile } from "next-auth/providers/github";
import { SessionStrategy } from "next-auth/core/types";

export default interface AuthOptions{
    adapter: Adapter; //! TAMAM

    providers: [
        OAuthConfig<GithubProfile>,
        OAuthConfig<GoogleProfile>,
        CredentialsConfig<{
          email: {
              label: string;
              type: string;
          };
          password: {
              label: string;
              type: string;
          };
        }>
    ];
    callbacks: {
      jwt({ token, user }: {
          token: any;
          user?: any;
      }): Promise<any>;
      session({ session, token }: any): Promise<any>;
    }
  
    pages: {
      signIn: string;
    }
    session: {
        strategy: SessionStrategy | undefined
        maxAge: number;
      };
      debug: boolean;
    secret: string | undefined;
  }
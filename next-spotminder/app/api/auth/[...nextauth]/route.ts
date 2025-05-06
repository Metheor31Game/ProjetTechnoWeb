import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getConnection } from "../../../../server/bdd"; // Ajuste le chemin
import bcrypt from "bcryptjs";

// Définir les options d'authentification
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        pseudo: { label: "Pseudo", type: "text" },
        mdp: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.pseudo || !credentials?.mdp) {
          throw new Error("Pseudo et mot de passe requis");
        }

        const connection = await getConnection();
        const [rows]: any = await connection.query(
          "SELECT pseudo, mdp FROM utilisateur WHERE pseudo = ?",
          [credentials.pseudo]
        );

        if (rows.length === 0) {
          throw new Error("Utilisateur non trouvé");
        }

        const match = await bcrypt.compare(credentials.mdp, rows[0].mdp);
        if (!match) {
          throw new Error("Mot de passe incorrect");
        }

        return { id: rows[0].pseudo, name: rows[0].pseudo };
      },
    }),
  ],
  pages: {
    signIn: "/connection",
    error: "/connection",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, // 1 heure
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.pseudo = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.pseudo) {
        session.user.pseudo = token.pseudo;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Créer le handler
const handler = NextAuth(authOptions);

// Exporter les méthodes HTTP
export { handler as GET, handler as POST };
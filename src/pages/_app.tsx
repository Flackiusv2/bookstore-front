import type { AppProps } from "next/app";
import { AuthorsProvider } from "../hooks/useAuthors";
import "../app/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthorsProvider>
      <Component {...pageProps} />
    </AuthorsProvider>
  );
}

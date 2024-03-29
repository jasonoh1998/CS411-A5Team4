import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import MainPage from "~/pages/mainPage";

// this is the login page

const Home: NextPage = () => {
    const { data: sessionData } = useSession();

    return (
        <>
        <Head>
            <title>Lyric Lab</title>
            <meta name="description" content="Play with your favorite songs" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
            {sessionData ? (
                <MainPage />
            ) : (
                <>
                <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1B4332] to-[#065F46]">
                    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Lyric <span className="text-[hsl(145,60%,65%)]">Lab</span>
                    </h1>
                    <div className="flex flex-col items-center gap-2">
                        <AuthShowcase />
                    </div>
                    </div>
                </main>
                </>
            )}
        </>
    );
    };

    export default Home;

    const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();
    return (
        <div className="flex flex-col items-center justify-center gap-4">
        <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
            {sessionData ? "Sign out" : "Sign in"}
        </button>
        </div>
    );
};

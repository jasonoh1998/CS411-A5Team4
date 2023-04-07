import React, { useState } from 'react';
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";


const Navbar: React.FC = () => {
    const { data: sessionData } = useSession();
    const router = useRouter();
    
    const navigateToHome = () => {
        router.push("/");
    };
    
    return (
        <nav className="bg-gradient-to-b from-[#1B4332] to-[#065F46] px-4 py-2 flex justify-between items-center fixed top-0 left-0 w-full">
            <a onClick={navigateToHome} className="cursor-pointer">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                    Lyric <span className="text-[hsl(145,60%,65%)]">Lab</span>
                </h1>
            </a>
            {sessionData && (
                <button
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                    onClick={sessionData ? () => void signOut() : () => void signIn()}
                >
                    Sign out
                </button>
            )}
        </nav>
    );
};

const MySongs: React.FC = () => {
    const { data: sessionData } = useSession();
    const { data: mySongs } = api.mySongs.getMySongs.useQuery(
        undefined, {
        enabled: sessionData?.user !== undefined,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    const handleSongClick = (song) => {
        setSelectedSong(song);
        setEditedLyrics(song.lyrics);
        setIsModalOpen(true);
    };

    const [editedLyrics, setEditedLyrics] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const editSong = async () => {
        try {
            const userEmail = sessionData?.user?.email;
            const userName = sessionData?.user?.name;

            const response = await fetch("/api/editSong", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: userName,
                    userEmail,
                    artist: selectedSong.artist,
                    song: selectedSong.song,
                    lyrics: editedLyrics,
                }),
            });
        
            const data = await response.json();
            console.log("Song edited:", data);

            // Close the modal
            setIsModalOpen(false);
            setSelectedSong(null);
            setEditedLyrics("");
            setIsEditing(false);
            // Reload the page
            location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSong = async () => {
        try {
            const userEmail = sessionData?.user?.email;

            const response = await fetch("/api/deleteSong", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail,
                    artist: selectedSong.artist,
                    song: selectedSong.song,
                }),
            });
            
            const data = await response.json();
            console.log('Song deleted:', data);
            // Close the modal
            setIsModalOpen(false);
            setSelectedSong(null);
            // Reload the page
            location.reload();
        } catch (error) {
            console.error(error);
        }
    };

  
    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-20 px-4 py-8 w-full md:w-3/4">
                {sessionData && (
                    <h1 className="text-3xl font-bold mb-10 text-center">
                    {sessionData.user?.name}'s Songs
                    </h1>
                )}
                {mySongs && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mySongs.map((song, index) => (
                            <div key={index} className="mb-6">
                            <button
                                className="text-2xl font-bold text-left focus:outline-none py-2 px-4 rounded-lg border-2 border-green-700 bg-white hover:bg-green-600 hover:shadow-md transition-all duration-200 w-full"
                                onClick={() => handleSongClick(song)}
                            >
                                {song.artist} - {song.song}
                            </button>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-900 opacity-100">
                    <div className="flex justify-end">
                        {isEditing ? (
                            <button onClick={editSong} className="bg-green-700 text-white px-4 py-2 rounded-lg mt-4 mb-4 mr-3 ml-3">Save</button>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 mb-4 mr-3 ml-3">Edit</button>
                        )}
                        <button onClick={deleteSong} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 mb-4 mr-3 ml-3">Delete</button>
                        <button onClick={() => {setIsModalOpen(false); setIsEditing(false);}} className="bg-gray-200 px-4 py-2 rounded-lg mt-4 mb-4 mr-3 ml-3">Close</button>
                    </div>
                    <div className="bg-white p-4 rounded-md overflow-y-auto max-h-[90vh] pr-4">
                    <div className="text-center">
                        <h2 className="text-lg font-medium mb-4">
                            {selectedSong.artist} - {selectedSong.song}
                        </h2>
                        {isEditing ? (
                            <textarea
                                className="w-full h-64 p-2 border border-gray-300 rounded-md"
                                value={editedLyrics}
                                onChange={(e) => setEditedLyrics(e.target.value)}
                            />
                        ) : (
                            <pre className="whitespace-pre-wrap">{selectedSong.lyrics}</pre>
                        )}
                    </div>
                    </div>
                </div>
                </div>
            )}
        </>
    );
};

export default MySongs;
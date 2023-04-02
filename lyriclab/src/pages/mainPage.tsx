import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const Navbar: React.FC<{ setResult: (result: any[]) => void }> = ({ setResult }) => {
  const { data: sessionData } = useSession();
  const [codeInput, setCodeInput] = useState("");
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      const result = [...data.result];
      result.unshift(codeInput);
      setResult(result);
      setCodeInput("");
    } catch(error) {
      console.error(error);
    }
  }

  const navigateToMySongs = () => {
    router.push("/mySongs");
  };

  return (
    <nav className="bg-gradient-to-b from-[#1B4332] to-[#065F46] px-4 py-2 flex justify-between items-center fixed top-0 left-0 w-full">
      <h1 className="text-2xl font-extrabold tracking-tight text-white">
        Lyric <span className="text-[hsl(145,60%,65%)]">Lab</span>
      </h1>
      <form onSubmit={onSubmit} className="w-1/2">
        <div className="flex items-center justify-center bg-white rounded-full px-4 w-full">
          <input
            type="text"
            placeholder="Type Your Artist"
            className="bg-transparent outline-none px-2 py-1 w-full"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
        </div>
      </form>
      {sessionData && (
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <button
            className="rounded-full bg-green-500 hover:bg-black mx-1 px-4 py-2 font-semibold text-white no-underline transition duration-300"
            onClick={navigateToMySongs}
          >
            My Songs
          </button>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
};

const MainPage: React.FC = () => {
  const [result, setResult] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const artist = result.length > 0 ? result[0] : "";
  const [lyrics, setLyrics] = useState('');
  const { data: sessionData } = useSession();

  const fetchLyrics = async (artist: string, song: string) => {
    try {
      const response = await fetch(`/api/lyrics?title=${encodeURIComponent(song)}&artist=${encodeURIComponent(artist)}`);
      const data = await response.json();
      setLyrics(data.lyrics);
    } catch (error) {
      console.error('Error fetching lyrics:', error);
    }
  };

  const toggleModal = (song: string) => {
    if (!selectedSong) {
      setSelectedSong(song);
      fetchLyrics(artist, song);
    } else {
      setSelectedSong(null);
      setLyrics('');
    }
  };

  const saveSong = async () => {
    try {
      const userEmail = sessionData?.user?.email;
      if (!userEmail) {
        throw new Error('User not logged in');
      }
  
      const response = await fetch('/api/saveSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, artist, song: selectedSong, lyrics }),
      });
  
      if (!response.ok) {
        throw new Error('Error saving song');
      }
  
      const data = await response.json();
      console.log('Song saved:', data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <Navbar setResult={setResult}/>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 w-full md:w-3/4 px-4 py-16 ">
          {result.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mt-5">
              <div className="w-full">
                <h2 className="text-center text-xl font-medium mb-2">Are these songs you are looking for?</h2>
                <h2 className="text-center text-xl font-medium mb-4">Click one you want to see the lyrics!</h2>
                <div className="flex justify-center items-center">
                  <p className="text-lg font-medium">Artist: {artist}</p>
                </div>
              </div>
              {result.filter(Boolean).slice(1).map((item, index) => (
                <div key={index} className="w-full md:w-1/2">
                  <button onClick={() => toggleModal(item)} className="py-2 px-4 rounded-lg border-2 border-[#1B4332] bg-white hover:bg-gray-100 w-full">
                    {item}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedSong && (
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 opacity-100">
              <div className="flex justify-end">
                <button onClick={saveSong} className="bg-green-200 px-4 py-2 rounded-lg mt-4 mb-4 mr-3">Save</button>
                <button onClick={() => toggleModal(null)} className="bg-gray-200 px-4 py-2 rounded-lg mt-4 mb-4 mr-3 ml-3">Close</button>
              </div>
              <div className="bg-white p-4 rounded-md overflow-y-auto max-h-[90vh] pr-4">
                <div className="text-center">
                  <h2 className="text-lg font-medium mb-4">{artist}'s {selectedSong}</h2>
                  <pre className="whitespace-pre-wrap">{lyrics}</pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default MainPage;
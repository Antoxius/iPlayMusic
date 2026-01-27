"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosPlay } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get access token from cookies (client-side)
    const match = document.cookie.match(/IPM_AT=([^;]+)/);
    if (match) setAccessToken(match[1]);
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setPlaylists(data.items || []));
  }, [accessToken]);

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setTracks([]);
    fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setTracks(data.items || []));
  };

  return (
    <div className="h-10 ">
      <Image
        width={375}
        height={273}
        src="/sound-wave.png"
        alt="Sound Wave Header img"
        className="w-full fixed top-0 -z-10"
      />
      <h1 className="text-4xl text-white font-bold ml-5 dark:text-white">
        Playlists
      </h1>
      <div className="flex overflow-x-auto">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className={`w-60 max-w-xs shrink-0 px-10 py-5 cursor-pointer ${
              selectedPlaylist?.id === playlist.id
            }`}
            onClick={() => handleSelectPlaylist(playlist)}
          >
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="shadow-2xl w-full object-cover rounded-md mb-2"
            />
            <h2 className="text-xl text-center font-bold">{playlist.name}</h2>
          </div>
        ))}
        {playlists.length === 0 && <h3 className="">No playlists found.</h3>}
      </div>
      {selectedPlaylist && (
        <div className="mt-8 rounded-lg overflow-y-auto h-120 p-6 pb-24">
          <h2 className="text-2xl font-bold mb-6">{selectedPlaylist.name} - Songs</h2>
          <ul className="flex gap-4 flex-col">
            {tracks.length > 0 ? (
              (showAll ? tracks : tracks.slice(0, 8)).map((item, idx) => (
                <li key={item.track.id || idx} className="py-2 flex items-center">
                  <Link className="flex h-8 items-center" href={`/playing/${item.track.id}`}>
                  <div className="bg-red-500 rounded-full w-8 p-2 text-white"><IoIosPlay /></div>
                  <div className="ml-3">
                    <div className="font-semibold">{item.track.name}</div>
                    <div className="text-sm">{item.track.artists.map((a) => a.name).join(", ")}</div>
                  </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No songs found or playlist is empty.</li>
            )}
          </ul>
          {!showAll && tracks.length > 8 && (
            <button
              className="my-10 py-4 text-center text-red-500 border-red-500 border-2 w-full rounded-full uppercase font-bold"
              onClick={() => router.push(`/songs?playlistId=${selectedPlaylist.id}`)}
            >
              Listen all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IoIosPlay } from "react-icons/io";

export default function SongsPage() {
  const searchParams = useSearchParams();
  const playlistId = searchParams.get("playlistId");
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const match = document.cookie.match(/IPM_AT=([^;]+)/);
    if (match) setAccessToken(match[1]);
  }, []);

  useEffect(() => {
    if (!accessToken || !playlistId) return;
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylistName(data.name || "");
        setTracks(data.tracks?.items || []);
      });
  }, [accessToken, playlistId]);

  return (
    <div>
      
      <h1 className="text-4xl font-bold mb-8 mt-8 text-center">{playlistName} - All Songs</h1>
      <ul className="mx-10">
        {tracks.length > 0 ? (
          tracks.map((item, idx) => (
            <li key={item.track.id || idx} className="py-4 flex items-center">
              <div className="mr-4 bg-red-500 rounded-full p-2 text-white"><IoIosPlay /></div>
              <div>
                <div className="font-semibold">{item.track.name}</div>
                <div className="text-sm">{item.track.artists.map((a) => a.name).join(", ")}</div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No songs found or playlist is empty.</li>
        )}
      </ul>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Track from "../components/track/Track";

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
    <>
      
      <h1 className="text-4xl font-bold mb-8 mt-8 mx-4 text-center">{playlistName} - All Songs</h1>
      <ul className="mx-5 overflow-scroll gap-3 h-140">
        {tracks.length > 0 ? (
          tracks.map((item, idx) => (
           <Track key={item.track.id} item={item} idx={idx} />
          ))
        ) : (
          <li className="text-gray-400">No songs found or playlist is empty.</li>
        )}
      </ul>
    </>
  );
}

"use client";
import { useState } from "react";
import { IoIosPlay } from "react-icons/io";
import Image from "next/image";

// Formatere sekunder til minuter og sekunder
function formatDurationMs(durationMs) {
  const totalSeconds = Math.floor((Number(durationMs) || 0) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

 export default function Track ({ item, idx }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handlePlayClick = (event) => {
        event.stopPropagation();
        // event.stopPropagation(); gør at klik på play knappen ikke trigger onClick på li elementet men kun på knappen
        setIsPlaying(!isPlaying);
    };

    let trackPlayingClass = "bg-white";
    if (isActive) {
      trackPlayingClass = "bg-red-500 text-white";
    } else {
      trackPlayingClass = "bg-white";
    }
 return (
    <li 
      onClick={() => setIsActive((value) => !value)}
      className= {`rounded-md flex items-stretch h-20 ${trackPlayingClass}`}>
      <div className={`mr-4 flex gap-4 justify-center relative items-center text-white ${trackPlayingClass}`}>
        <div className="relative h-full aspect-square">
          {isActive && (
            <Image
              src={item.track.album.images[0].url}
              alt={item.track.name}
              fill
              sizes="120px"
              className="object-cover rounded"
            />
          )}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-red-500 w-7 h-7 flex rounded-full items-center justify-center">
              <IoIosPlay className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="font-semibold">{item.track.name}</div>
        <div className="text-sm">{item.track.artists.map((a) => a.name).join(", ")}</div>
      </div>
      <div className="ml-auto flex items-center pr-2 tabular-nums">{formatDurationMs(item.track.duration_ms)}</div>
    </li>
 )
 }
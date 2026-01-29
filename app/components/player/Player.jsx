'use client';
import { IoMdPlay, IoMdPause, IoIosSkipBackward, IoIosSkipForward, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { IoPlayForward, IoPlayBack } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";

export default function Player({ track }) {
    const title = track?.name || "";
    let artists = "";
    if (Array.isArray(track?.artists)) {
        artists = track.artists.map((a) => a?.name).filter(Boolean).join(", ");
    } else {
        artists = "";
    }
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false)

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const safeDuration = duration > 0 ? duration : 1;
    const [volume, setVolume] = useState(1);
    const [isVolumeOpen, setIsVolumeOpen] = useState(false);

    function togglePlayer() {
        const audio = playerRef.current;
        if (!audio) return;

        if (audio.paused) audio.play();
        else audio.pause();
    }

    // UI syncs with audio element
    useEffect(() => {
        const audio = playerRef.current;
        if (!audio) return;

        const syncDuration = () => {
            setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
        };
        const syncTime = () => {
            setCurrentTime(audio.currentTime || 0);
        };
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);
        const onVolumeChange = () => {
            const next = Number.isFinite(audio.volume) ? audio.volume : 1;
            setVolume(next);
        };

        audio.addEventListener("loadedmetadata", syncDuration);
        audio.addEventListener("durationchange", syncDuration);
        audio.addEventListener("timeupdate", syncTime);
        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("volumechange", onVolumeChange);

        syncDuration();
        syncTime();
        setIsPlaying(!audio.paused);
        onVolumeChange();

        return () => {
            audio.removeEventListener("loadedmetadata", syncDuration);
            audio.removeEventListener("durationchange", syncDuration);
            audio.removeEventListener("timeupdate", syncTime);
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnded);
            audio.removeEventListener("volumechange", onVolumeChange);
        };
    }, []);

    const handleSeek = (event) => {
        const audio = playerRef.current;
        if (!audio) return;

        const next = parseFloat(event.target.value);
        audio.currentTime = next;
        setCurrentTime(next);
    };

    const handleVolume = (event) => {
        const audio = playerRef.current;
        if (!audio) return;

        const next = parseFloat(event.target.value);
        const clamped = Math.max(0, Math.min(next, 1));
        audio.volume = clamped;
        setVolume(clamped);
    };
return (
    <>
        <div className="flex flex-col space-between mt-top-auto">
            <div className="gap-4 flex flex-col px-4">
                <span className="text-white text-center font-semibold truncate">{title}</span>
                <span className="text-white/80 text-center text-sm truncate">{artists}</span>
            </div>

            <audio ref={playerRef} src="/Aetheric-SnapCrackle.mp3" preload="metadata"></audio>
            
            <div className="flex justify-center items-center gap-8 my-4">
                <button>
                    <IoIosSkipBackward className="text-4xl text-white" />
                </button>
                <button>
                    <IoPlayBack className="text-4xl text-white" />
                </button>
                <button onClick={togglePlayer}>
                    {/* if else shorthand */}
                    {isPlaying ? <IoMdPause className="text-4xl text-white"  /> :
                     <IoMdPlay className="text-4xl text-white" />}
                </button>
                <button>
                    <IoPlayForward className="text-4xl text-white" />
                </button>
                <button>
                    <IoIosSkipForward className="text-4xl text-white" />
                </button>
            </div>
            <div className="px-10 flex items-center gap-3">
                <input
                    type="range"
                    min={0}
                    max={safeDuration}
                    step={0.1}
                    value={Math.max(0, Math.min(currentTime, safeDuration))}
                    onInput={handleSeek}
                    className="w-full"
                    aria-label="Track position"
                />

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsVolumeOpen((v) => !v)}
                        className="text-white"
                        aria-label="Volume"
                        aria-expanded={isVolumeOpen}
                    >
                        {volume <= 0.001 ? (
                            <IoMdVolumeOff className="text-2xl" />
                        ) : (
                            <IoMdVolumeHigh className="text-2xl" />
                        )}
                    </button>

                    {isVolumeOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 p-2 z-10">
                            <div className="h-24 w-6 flex items-center justify-center">
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={Math.max(0, Math.min(volume, 1))}
                                    onInput={handleVolume}
                                    onChange={handleVolume}
                                    className="h-24 w-6 touch-none select-none"
                                    style={{  WebkitAppearance: 'slider-vertical' }}
                                    aria-label="Volume slider"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
)
}
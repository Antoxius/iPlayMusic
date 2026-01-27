import PlayerButtons from "./PlayerButtons";
import PlayerTimeline from "./PlayerTimeline";

export default function Player({ track }) {
    const title = track?.name || "";
    let artists = "";
    if (Array.isArray(track?.artists)) {
        artists = track.artists.map((a) => a?.name).filter(Boolean).join(", ");
    } else {
        artists = "";
    }

return (
    <>
        <div className="flex flex-col space-between mt-top-auto">
            <div className="gap-4 flex flex-col px-4">
                <div className="text-white text-center font-semibold truncate">{title}</div>
                <div className="text-white/80 text-center text-sm truncate">{artists}</div>
            </div>
            <PlayerTimeline />
            <PlayerButtons />
        </div>
    </>
)
}
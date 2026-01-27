
import { cookies } from "next/headers";
import Image from "next/image";
import Player from "@/app/components/player/Player";

export default async function Playing({params}) {
    const {trackID} = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("IPM_AT")?.value;
    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
        headers: { Authorization: `Bearer ${accessToken}`}
    });
    const trackData = await res.json()
    console.log(trackData);
    
return (
    <>

        <div className="fixed inset-0 -z-10">
        <Image
            src={trackData.album.images[0].url}
            alt="Background Image"
            sizes="100vw"
            className="object-cover"
            priority
            fill
        />
        </div>
        <div className="fixed left-0 right-0 bottom-20 z-20">
            <Player track={trackData} />
        </div>
    
    </>
)
}
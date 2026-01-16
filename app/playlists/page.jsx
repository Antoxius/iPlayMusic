import Image from "next/image";

export default function Playlists() {

return (
<div className="h-30 ">
    <Image width={375} height={273} src="/sound-wave.png" alt="Sound Wave Header img" className="w-full fixed top-0 -z-10" />
    <h1 className="text-4xl text-white font-bold dark:text-white">
      Playlists
    </h1>
    <p className="text-lg text-gray-700 dark:text-gray-300">
      Top 50 Rock Ballads
    </p>
</div>
)}
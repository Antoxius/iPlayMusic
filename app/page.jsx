import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get('IPM_AT');

  // Spotify API-kald midlertidigt udkommenteret for at undgå fejl uden token
  // const res = await fetch('https://api.spotify.com/v1/me', {
  //   headers: {
  //     Authorization: `Bearer ${accessTokenCookie.value}`
  //   }
  // });
  // console.log(await res.json());
  return (
    <div className="-mt-60">
      <main className="mx-6 ">
        <h1 className="text-5xl text-white font-bold dark:text-white">
          Playlist
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Top 50 Rock Ballads
        </p>
      </main>
    </div>
  );
}

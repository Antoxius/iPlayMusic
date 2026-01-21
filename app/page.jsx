const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get('IPM_AT');

  // Spotify API-kald midlertidigt udkommenteret for at undgå fejl uden token

  return (
    <>
      <div className="mx-10">
        <h1 className="text-3xl mb-8">Log In</h1>
        <form action="">
          <div className="border-b-2 flex gap-4 flex-col mb-4">
            <label htmlFor="username">Username</label>
            <input type="text" name="Username" id="username" placeholder="Enter your username" />
          </div>
          <div className="border-b-2 flex gap-4 flex-col mb-4">
            <label htmlFor="password">Password</label>
            <input type="password" name="Password" id="password" placeholder="Enter your password" />
          </div>
        </form>
        <button className="p-5 mt-4 w-full border-4 rounded-full">
            <a href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private`}
            className="w-full h-full uppercase font-bold">
                Log in
            </a>
        </button>
        <div>
          
        </div>
      </div>
    </>
  );
}

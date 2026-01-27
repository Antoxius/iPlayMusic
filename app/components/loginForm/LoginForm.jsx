import { cookies } from "next/headers";
import { IoIosFingerPrint } from "react-icons/io";

export default async function LoginForm() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private`;

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold mb-8">Log In</h1>
      <form action="">
        <div className="border-b-2 flex gap-4 flex-col mb-4">
          <label className="flex flex-col gap-2" htmlFor="username">
            <span className="font-bold mb-2">Username</span>
            <input
              type="text"
              name="Username"
              id="username"
              placeholder="Enter your username"
            />
          </label>
        </div>

        <div className="border-b-2 flex gap-4 flex-col mb-4">
          <label className="flex flex-col gap-2" htmlFor="password">
            <span className="font-bold mb-2">Password</span>
            <input
              type="password"
              name="Password"
              id="password"
              placeholder="Enter your password"
            />
          </label>
        </div>
      </form>

      <button className="p-5 mt-4 w-full border-4 rounded-full">
        <a href={authUrl} className="w-full h-full uppercase font-bold">
          Log in
        </a>
      </button>

      <div className="flex justify-center flex-col items-center mt-4">
        <button className="bg-pink-600 rounded-full text-white w-15 h-15 flex justify-center items-center">
          <IoIosFingerPrint className="h-8 w-8" />
        </button>
        <p className="mt-5">One-Touch Login</p>
      </div>
    </div>
  );
}

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

export default function LoginPage () {

return (
    <>
        <div className="mx-auto w-full">

        <h1 className="text-3xl mb-8">Login Page</h1>
        <button className="bg-orange-500 p-5 border-4 rounded-lg">
            <a href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private`}
            className="w-full h-full">
                Log in with Spotify
            </a>
        </button>
        </div>
    </>
)
}
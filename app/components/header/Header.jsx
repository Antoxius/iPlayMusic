
import Image from "next/image.js";
import Navigation from "../Navigation/Navigation.jsx";

export default function Header () {
    return (
        <header className="w-full h-80 relative flex justify-center mb-8">
            {/* Baggrundsbillede */}
            <div className="absolute inset-0 w-full h-full -z-10">
                <Image fill src="/sound-wave.png" alt="Sound Wave Header img"  />
            </div>
            {/* Indhold ovenpå billedet */}
            <div className="w-full ">
                <Navigation/>
            </div>
        </header>
    )
}
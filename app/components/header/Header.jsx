
import Image from "next/image.js";
import Navigation from "../navigation/HeaderNavigation.jsx";

export default function Header () {
    return (
        <header className="w-full relative flex justify-center mb-8">
            {/* Baggrundsbillede */}
            
            {/* Indhold ovenpå billedet */}
            <div className="w-full ">
                <Navigation/>
            </div>
        </header>
    )
}
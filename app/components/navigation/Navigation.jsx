
'use client';
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";

export default function Navigation () {
    const pathname = usePathname();

    // Udtræk sidetitlen fra path
    let pageTitle = "Home";
    if (pathname && pathname !== "/") {
        // Fjern første / og tag første segment
        const segments = pathname.split("/").filter(Boolean);
        pageTitle = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
    }

    return (
        <nav className="flex justify-center w-full items-center text-white p-4">
            <ul className="flex w-full mx-10">
                <li className="flex items-center justify-between w-full ">
                    <Link href="/">
                        <FaChevronLeft className="inline mr-2"/>
                    </Link>
                    <h1>{pageTitle}</h1>
                    <CiSearch />
                </li>
            </ul>
        </nav>
    );
}
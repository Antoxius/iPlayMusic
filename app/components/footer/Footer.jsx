import { TbActivityHeartbeat } from "react-icons/tb";
import { IoIosMicrophone } from "react-icons/io";
import { IoMdWifi } from "react-icons/io";
import { IoIosContrast } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
export default function Footer () {

return (
    <>
        <footer className="w-full shadow-2xl fixed bottom-0 mt-8 py-4 border-t shadow- bg-white flex justify-center items-center">
            <div className="flex gap-4">
                <TbActivityHeartbeat className="text-2xl">
                    <a href="http://index"></a>
                </TbActivityHeartbeat>
                <IoIosMicrophone className="text-2xl">
                    <a href="http://index"></a>
                </IoIosMicrophone>
                <IoMdWifi className="text-2xl">
                    <a href="http://index"></a>
                </IoMdWifi>
                <IoIosContrast className="text-2xl">
                    <a href="http://index"></a>
                </IoIosContrast>
                <IoMdSettings className="text-2xl">
                    <a href="http://index"></a>
                </IoMdSettings>
            </div>
        </footer>
    </>
)
}
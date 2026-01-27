import { IoMdPlay, IoIosSkipBackward, IoIosSkipForward} from "react-icons/io";
import { IoPlayForward, IoPlayBack } from "react-icons/io5";

export default function PlayerButtons () {

return (
    <>
    <div className="flex justify-center items-center gap-8 my-4">
        <button>
            <IoIosSkipBackward className="text-4xl text-white" />
        </button>
        <button>
            <IoPlayBack className="text-4xl text-white" />
        </button>
        <button>
            <IoMdPlay className="text-4xl text-white"/>
        </button>
        <button>
            <IoPlayForward className="text-4xl text-white" />
        </button>
        <button>
            <IoIosSkipForward className="text-4xl text-white" />
        </button>
    </div>
    </>
)
}
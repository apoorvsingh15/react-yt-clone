import { API_KEY } from "../data/credentials/constants";
import ytLogo from "/yt.svg";
import { SignalIcon } from "@heroicons/react/24/outline";
const VideoCard = () => {
  console.log(API_KEY, "<==");
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 px-2 mb-4">
      <div className="bg-white rounded-md">Video</div>
      <div className="flex mt-3">
        <div className="mr-3">
          <div className="rounded-full bg-white">
            <img className="h-8 w-8 " src={ytLogo} alt="youtube_Logo" />
          </div>
        </div>
        <div>
          <div>Heading</div>
          <div>Channel Name</div>
          <div>Watching</div>
          <div className="inline-flex bg-red-900 p-1 rounded-sm">
            <div className="mr-2">
              <SignalIcon className="block h-4 w-4" aria-hidden="true" />
            </div>
            <div className="text-xs">LIVE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

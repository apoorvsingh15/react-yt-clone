/* eslint-disable react/prop-types */
import { decodeHtmlEntities } from "../utils/fetchUtils";
import ytLogo from "/yt.svg";

const VideoCard = ({ channelInfo }) => {
  if (channelInfo?.id?.kind !== "youtube#video") {
    return <></>;
  } else {
    return (
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5 px-2 mb-12 cursor-pointer">
        <div>
          <img
            className="rounded-md hover:rounded-none"
            src={channelInfo?.snippet?.thumbnails?.medium?.url}
          />
        </div>
        <div className="flex mt-3">
          <div className="mr-3">
            <div className="min-w-8 rounded-full bg-white">
              <img className="h-8 w-8" src={ytLogo} alt="youtube_Logo" />
            </div>
          </div>
          <div>
            <div className="font-medium truncate max-w-52">
              {decodeHtmlEntities(channelInfo?.snippet?.title)}
            </div>
            <div className="font-sans text-xs text-neutral-400 truncate max-w-44">
              {decodeHtmlEntities(channelInfo?.snippet?.channelTitle)}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default VideoCard;

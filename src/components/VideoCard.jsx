/* eslint-disable react/prop-types */
import { decodeHtmlEntities } from "../utils/fetchUtils";
import ytLogo from "/yt.svg";

const VideoCard = ({ channelInfo }) => {
  if (channelInfo?.id?.kind !== "youtube#video") {
    return null;
  }

  const title = decodeHtmlEntities(channelInfo?.snippet?.title ?? "");
  const channel = decodeHtmlEntities(channelInfo?.snippet?.channelTitle ?? "");
  const thumbnail =
    channelInfo?.snippet?.thumbnails?.medium?.url ||
    channelInfo?.snippet?.thumbnails?.default?.url;
  const publishedAt = channelInfo?.snippet?.publishedAt
    ? new Date(channelInfo.snippet.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 px-2 mb-6 cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-xl aspect-video bg-gray-200 dark:bg-gray-800">
        {thumbnail ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            src={thumbnail}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img className="h-10 w-10 opacity-30" src={ytLogo} alt="Thumbnail unavailable" />
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex gap-3 mt-3">
        {/* Channel avatar */}
        <div className="flex-shrink-0">
          <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <img className="h-5 w-5 opacity-60" src={ytLogo} alt="Channel avatar" />
          </div>
        </div>

        {/* Title + channel */}
        <div className="min-w-0 flex-1">
          <p
            className="text-sm font-semibold leading-snug line-clamp-2 text-gray-900 dark:text-white group-hover:text-yt-red dark:group-hover:text-red-400 transition-colors"
            title={title}
          >
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate hover:text-gray-700 dark:hover:text-gray-300">
            {channel}
          </p>
          {publishedAt && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {publishedAt}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

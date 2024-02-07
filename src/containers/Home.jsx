import Header from "../components/Header";
import VideoCard from "../components/VideoCard";

import useYoutubeSearch from "../hooks/dataFetching/YoutubeSearchHooks";

const Home = () => {
  const params = {
    part: "snippet",
    q: "f1",
  };

  const { data, status, error } = useYoutubeSearch(params);
  return (
    <>
      <Header />
      {console.log(status, error, data)}
      <div className="flex m-2.5">
        <div className="hidden sm:hidden md:hidden w-72 lg:block w-72 xl:block w-72">
          Side Bar
        </div>
        <div className="flex flex-wrap -mx-2">
          {data?.items?.length &&
            data?.items?.map((channelInfo) => (
              <VideoCard key={channelInfo?.etag} channelInfo={channelInfo} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

import { useEffect, useState } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";

import useYoutubeSearch from "../hooks/dataFetching/YoutubeSearchHooks";

const Home = () => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [params, setParams] = useState({
    part: "snippet",
    q: "f1",
  });
  const [isAtBottom, setIsAtBottom] = useState(false);

  const { data, status } = useYoutubeSearch(params);

  const paginateApiCall = () => {
    if (data?.nextPageToken) {
      setParams((prevParams) => ({
        ...prevParams,
        pageToken: data.nextPageToken,
      }));
    }
  };

  useEffect(() => {
    if (data?.items) {
      let unique = new Map();
      unique = [...paginatedData, ...data.items];
      setPaginatedData([...unique]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.items]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;

      // Check if the user has scrolled to the bottom
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      setIsAtBottom(isAtBottom);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isAtBottom && status !== "loading") paginateApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAtBottom]);

  return (
    <div>
      <Header />
      <div className="flex m-2.5">
        <div className="hidden sm:hidden md:hidden min-w-72 lg:block min-w-72 xl:block min-w-72">
          Side Bar
        </div>
        <div className="flex flex-wrap -mx-2">
          {paginatedData?.length
            ? paginatedData?.map((channelInfo) => (
                <VideoCard
                  key={channelInfo?.id?.videoId}
                  channelInfo={channelInfo}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";

import useYoutubeSearch from "../hooks/dataFetching/YoutubeSearchHooks";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [params, setParams] = useState({
    part: "snippet",
    q: "cars",
  });
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleClickSearch = (searchTerm) => {
    if (searchTerm !== params.q) {
      setPaginatedData([]);
      setParams({
        part: "snippet",
        q: searchTerm,
      });
    }
  };

  useEffect(() => {
    if (data?.items) {
      const newData = [...paginatedData];

      // Filter out duplicates based on a unique identifier (e.g., item.id)
      const uniqueItems = data.items.filter(
        (item) =>
          !newData.some(
            (existingItem) => existingItem.id.videoId === item.id.videoId
          )
      );
      // Update paginatedData with unique items
      setPaginatedData([...new Set([...newData, ...uniqueItems])]);
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
      <Header
        onClickSearch={handleClickSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="flex m-2.5">
        <div className="hidden sm:hidden md:hidden min-w-72 lg:block min-w-72 xl:block min-w-72">
          <Sidebar />
        </div>
        <div className="flex flex-wrap -mx-2 mt-20">
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

import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import useYoutubeSearch from "../hooks/dataFetching/YoutubeSearchHooks";
import Sidebar from "../components/Sidebar";

/* Loading skeleton for video cards */
function VideoCardSkeleton() {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 px-2 mb-6 animate-pulse">
      <div className="rounded-xl aspect-video bg-gray-200 dark:bg-gray-800" />
      <div className="flex gap-3 mt-3">
        <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
          <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

const SKELETON_COUNT = 12;

const Home = () => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [params, setParams] = useState({ part: "snippet", q: "cars" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(false);

  // On desktop (lg+): sidebarCollapsed controls full vs mini sidebar
  // On mobile (<lg):  mobileSidebarOpen controls the overlay drawer
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { data, status } = useYoutubeSearch(params);

  const handleToggleSidebar = useCallback(() => {
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen((o) => !o);
    } else {
      setSidebarCollapsed((c) => !c);
    }
  }, []);

  const handleCloseMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const paginateApiCall = useCallback(() => {
    if (data?.nextPageToken) {
      setParams((prev) => ({ ...prev, pageToken: data.nextPageToken }));
    }
  }, [data?.nextPageToken]);

  const handleClickSearch = useCallback(
    (term) => {
      if (term !== params.q) {
        setPaginatedData([]);
        setParams({ part: "snippet", q: term });
      }
    },
    [params.q]
  );

  useEffect(() => {
    if (data?.items) {
      setPaginatedData((prev) => {
        const ids = new Set(prev.map((item) => item.id.videoId));
        const unique = data.items.filter((item) => !ids.has(item.id.videoId));
        return [...prev, ...unique];
      });
    }
  }, [data?.items]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isAtBottom && status !== "loading") paginateApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAtBottom]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white">
      <Header
        onClickSearch={handleClickSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onToggleSidebar={handleToggleSidebar}
      />

      <Sidebar
        open={mobileSidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={handleCloseMobileSidebar}
      />

      {/* Main content — offset by fixed sidebar on lg+ */}
      <main
        className={`pt-14 transition-[margin] duration-200 ease-in-out ${
          sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-60"
        }`}
      >
        <div className="px-3 sm:px-4 py-4">
          <div className="flex flex-wrap -mx-2">
            {status === "loading" && paginatedData.length === 0
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <VideoCardSkeleton key={i} />
                ))
              : paginatedData.map((channelInfo) => (
                  <VideoCard key={channelInfo?.id?.videoId} channelInfo={channelInfo} />
                ))}
          </div>

          {/* Bottom loading indicator */}
          {status === "loading" && paginatedData.length > 0 && (
            <div className="flex justify-center py-8">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="inline-block h-2.5 w-2.5 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Failed to load videos
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Check your API key or try again later.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

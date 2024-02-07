import Header from "../components/Header";
import VideoCard from "../components/VideoCard";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex m-2.5">
        <div className="hidden sm:hidden md:hidden w-72 lg:block w-72 xl:block w-72">
          Side Bar
        </div>
        <div className="flex flex-wrap -mx-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
            <VideoCard key={Date.now()} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

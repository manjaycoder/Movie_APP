import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import ReadTimeCard from "./ReadTimeCard";
import { useGetTopMoviesQuery, useGetAllMoviesQuery } from "../../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews) || [];
  const sumOfCommentsLength = totalCommentsLength.reduce((acc, length) => acc + length, 0);

  return (
    <div>
      <section className="flex justify-around overflow-x-hidden">
        <div className="ml-[14rem] mt-10">
          <div className="-translate-x-4 flex">
            <SecondaryCard
              pills="Users"
              content={visitors?.length || 0}
              info="20.2K more than usual"
              gradient="from-teal-500 to-lime-400"
            />
            <SecondaryCard
              pills="Comments"
              content={sumOfCommentsLength || 0}
              info="742.8 more than usual"
              gradient="from-[#CCC514] to-[#CDCB8E]"
            />
            <SecondaryCard
              pills="Movies"
              content={allMovies?.length || 0}
              info="372+ more than usual"
              gradient="from-green-500 to-lime-400"
            />
          </div>
          <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
            <p>Top Contents</p>
            <p>Comments</p>
          </div>
          {topMovies?.map((movie) => (
            <VideoCard
              key={movie._id}
              image={movie.image}
              title={movie.name}
              date={movie.year}
              comments={movie.numReviews}
            />
          ))}
        </div>
        <div>
          <ReadTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;

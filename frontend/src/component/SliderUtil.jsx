import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./pages/Movies/MovieCard";

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true, // Auto-play feature
    autoplaySpeed: 3000, // Auto-play speed
    pauseOnHover: true, // Pause on hover
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {data?.length ? (
          data.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <div className="text-center text-gray-500">Loading Movies...</div>
        )}
      </Slider>
      <style>{`
        .slick-slide {
          transition: transform 0.3s ease-in-out;
        }
        .slick-slide:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default SliderUtil;

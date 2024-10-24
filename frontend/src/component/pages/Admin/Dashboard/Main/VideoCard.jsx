const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div>
      <div className="flex items-center w-[90%] mt-5 ">
        <div>
          <img src={image} alt="Card Image " className="h-[5rem] object fit" />
        </div>
        <div className="ml-4">
          <h4 className="text-lg text-white">{title}</h4>
          <p className="text-gray-500 mb-3">{date}</p>
        </div>
        <div className="flex-grow mb-5 flex justify-end items-center">
          <div className="text-white text-lg">{comments}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

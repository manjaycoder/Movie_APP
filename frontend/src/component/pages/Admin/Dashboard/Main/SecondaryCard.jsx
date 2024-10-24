const SecondaryCard = ({ pills, content, info, gradient }) => {
  return (
    <div
      className={`w-60 h-48 relative mt-10 bg-gradient-to-b ${gradient} rounded-lg shadow-lg transition-transform transform hover:scale-105 ml-5`}
    >
      <div
        className={`absolute -top-4 left-1/2 transform -translate-x-1/2 border bg-gradient-to-b ${gradient} rounded-full py-2 px-5 text-sm text-gray-800 font-semibold shadow-md`}
      >
        {pills} 
      </div>
      <div className="flex items-center justify-center h-full">
        <h2 className="text-4xl font-bold text-white">{content}  </h2>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white text-center">
        {info}
      </div>
    </div>
  );
};

export default SecondaryCard;

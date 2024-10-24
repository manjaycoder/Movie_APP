import { useGetUsersQuery } from '../../../../../redux/api/users';

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-full h-40 bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-2 text-teal-400">Congratulations!</h2>
      <p className="text-lg">
        You have <span className="font-semibold">{visitors?.length || 0}</span> new users watching your content.
      </p>
      <div className="mt-4">
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
          View Users
        </button>
      </div>
    </div>
  );
};

export default PrimaryCard;

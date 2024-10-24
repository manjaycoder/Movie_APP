import { useGetUsersQuery } from '../../../../../redux/api/users';
import PrimaryCard from './PrimaryCard';

const ReadTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-80 mt-10 bg-gray-800 text-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold mb-2">Realtime</h2>
      <p className="text-gray-400 mb-4">Live Updates</p>
      <div className="border-t border-gray-600 my-4"></div>
      <h2 className="text-4xl font-bold mb-2">{visitors?.length || 0}</h2>
      <p className="text-gray-400 mb-2">Subscribers</p>
      <div className="border-t border-gray-600 my-4"></div>
      <PrimaryCard />
    </div>
  );
};

export default ReadTimeCard;

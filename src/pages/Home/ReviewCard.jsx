import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ data }) => {
  const { userName, review, user_photoURL } = data;
  console.log(data);
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 max-w-sm ">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-secondary text-3xl mb-4" />

      {/* Review Text */}
      <p className="text-gray-600 ">{review}</p>

      {/* Dashed Divider */}
      <div className="border-t border-dashed border-gray-300 my-5"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Profile Circle */}
        <img
          src={user_photoURL}
          alt={userName}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-teal-900">{userName}</h3>
          <p className="text-gray-500 text-sm">Customer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

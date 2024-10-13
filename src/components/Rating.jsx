

const Rating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex items-center mb-2">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => onRatingChange(index + 1)}
          >
            ★
          </span>
        ))}
    </div>
  );
};

export default Rating;

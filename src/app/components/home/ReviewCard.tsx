/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import starIcon from "../../../../public/star.svg";

interface ReviewComposition {
  reviewerName: string;
  starQuantity: number;
  reviewComment: string;
}

const ReviewCard: React.FC<ReviewComposition> = ({
  reviewerName,
  starQuantity,
  reviewComment,
}) => {
  return (
    <div className="bg-slate-100 min-w-[250px] max-w-[300px] h-full flex flex-col items-center justify-center rounded-xl text-center text-black px-1 py-4">
      <p className="font-poppinssb">{reviewerName}</p>
      <div className="flex flex-row justify-center space-x-1 mt-1">
        {Array.from({ length: starQuantity }, (_, i) => (
          <Image width={15} height={15} src={starIcon} alt="starIcon" key={i} />
        ))}
      </div>
      <p className="mt-4 font-poppinslight text-sm">"{reviewComment}"</p>
    </div>
  );
};

export default ReviewCard;

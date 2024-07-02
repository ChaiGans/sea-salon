interface Props {
  branchName: string;
  branchLocation: string;
  startTime: string;
  serviceName: string;
  sessionLong: number;
}

const ReservationCard: React.FC<Props> = ({
  branchName,
  branchLocation,
  startTime,
  serviceName,
  sessionLong,
}) => {
  return (
    <div className="w-full bg-yellow-50 rounded-md text-black px-3 py-2 flex flex-col space-y-1">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-poppinssb">{branchName}</h1>
        <label className="font-poppinsregular text-xs">{startTime}</label>
      </div>

      <label className="font-poppinsregular text-xs">{branchLocation}</label>
      <label className="font-poppinsregular text-xs">{serviceName}</label>
      <label className="font-poppinsregular text-xs">
        {sessionLong} minutes
      </label>
    </div>
  );
};

export default ReservationCard;

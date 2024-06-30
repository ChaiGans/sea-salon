import { Service } from "@/app/dashboard/page";

interface BranchProps {
  branchName: string;
  branchLocation: string;
  branchOpenTime: string;
  branchCloseTime: string;
  branchServices: any;
}

const BranchCard: React.FC<BranchProps> = ({
  branchName,
  branchLocation,
  branchOpenTime,
  branchCloseTime,
  branchServices,
}) => {
  return (
    <div className="w-full bg-yellow-50 rounded-md text-black px-3 py-2 flex flex-col space-y-1">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-poppinssb">{branchName}</h1>
        <label className="font-poppinsregular text-xs">
          {branchOpenTime} - {branchCloseTime}
        </label>
      </div>

      <label className="font-poppinsregular text-xs">{branchLocation}</label>
      {branchServices.map((service: any, index: number) => {
        return (
          <label className="font-poppinsregular text-xs" key={index}>
            {service.Service.service_name} - {service.minutes} minutes
          </label>
        );
      })}
    </div>
  );
};

export default BranchCard;

import React from "react";

interface PageHeaderProps {
  clinicName: string;
  activePatients: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ clinicName, activePatients }) => {
  return (
    <div className="p-4 flex flex-col justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold">{clinicName}</h1>
        <p className="text-sm text-gray-500">{activePatients} Active Patients</p>
      </div>
      <hr className="w-full mt-2 border-gray-300"></hr>
    </div>
  );
};

export default PageHeader;

import React from "react";

interface PageHeaderProps {
  clinicName: string;
  activePatients: number | null;
}

const PageHeader: React.FC<PageHeaderProps> = ({ clinicName, activePatients }) => {
  return (
    <div className="flex flex-col items-start justify-between p-4">
      <div>
        <h1 className="text-3xl font-bold">{clinicName}</h1>
        {activePatients != null && <p>Active Patients: {activePatients}</p>}
      </div>
      <hr className="mt-2 w-full border-gray-300"></hr>
    </div>
  );
};

export default PageHeader;

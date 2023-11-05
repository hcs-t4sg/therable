"use client";

import * as Avatar from "@radix-ui/react-avatar";

interface PatientCardProps {
  userId: string;
  firstName: string;
  lastName: string;
  diagnosis?: string;
  lastVisit?: Date;
  nextVisit?: Date;
  avatar?: string;
}

export default function PatientCard(props: PatientCardProps) {
  return (
    <div className="h-[260px] w-[252px] rounded-xl border-2 p-4 shadow-md">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-row gap-3 pl-1 pt-2">
          <Avatar.Root
            className="flex h-16 w-16 items-center justify-center
                overflow-hidden rounded-full border-2 align-middle"
          >
            <Avatar.Image className="object-cover" src={props.avatar} alt={props.lastName} />
            <Avatar.Fallback className="text-2xl font-medium">
              {props.firstName.charAt(0) + props.lastName.charAt(0)}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="space-y-1 text-xs">
            <div className="pb-0.25 text-lg font-medium">
              {props.firstName} {props.lastName}
            </div>
            {props.diagnosis && <div>Diagnosis: {props.diagnosis}</div>}
            {props.lastVisit && (
              <div>
                Last visit:{" "}
                {props.lastVisit.getMonth() + "/" + props.lastVisit.getDay() + "/" + props.lastVisit.getFullYear()}
              </div>
            )}
            {props.nextVisit && (
              <div>
                Next visit:{" "}
                {props.nextVisit.getMonth() + "/" + props.nextVisit.getDay() + "/" + props.nextVisit.getFullYear()}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center gap-6 pb-1">
          <button className="h-fit rounded-lg bg-green-50 p-2 pl-3 pr-4">
            <div className="h-12" />
            <div className="text-xs font-medium text-green-700">Progress</div>
          </button>
          <button className="h-fit rounded-lg bg-gray-100 p-2 pl-3 pr-4">
            <div className="h-12" />
            <div className="text-xs font-medium text-gray-500">Message</div>
          </button>
        </div>
      </div>
    </div>
  );
}

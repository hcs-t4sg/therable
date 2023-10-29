import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const LoginCard: React.FC<CardProps> = ({ className, children }) => {
  const cardClasses = `mx-auto flex w-full flex-col justify-center space-y-6 rounded border-2 border-black px-12 py-8 sm:w-[350px] ${
    className ?? ""
  }`;
  return <div className={cardClasses}>{children}</div>;
};

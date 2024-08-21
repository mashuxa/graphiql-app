import { FC } from "react";

interface PreloaderProps {
  className?: string;
}

const Preloader: FC<PreloaderProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Preloader;

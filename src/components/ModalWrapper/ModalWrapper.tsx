"use client";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { useRouter } from "src/i18n.config";

const ModalWrapper: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const handleClick = (): void => {
    router.back();
  };

  return (
    <div>
      <div className="w-full h-full fixed inset-0  bg-gray-300 overflow-y-scroll">
        <div className="modal-wrapper relative inset-y-28 bg-white max-w-[70%] mx-auto p-5">
          <button
            className="absolute inset-y-0 right-0 h-10 w-10 leading-10"
            onClick={handleClick}
            data-testid="modal-wrapper-close-button"
          >
            <Image src="/cross.png" alt="Close button" width={40} height={40} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;

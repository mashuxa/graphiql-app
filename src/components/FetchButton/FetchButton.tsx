"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ButtonHTMLAttributes, FC } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (): void => {
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    router.push(currentUrl);
  };

  return (
    <button
      onClick={handleClick}
      {...props}
      className={`${className} block font-medium p-2 border transition hover:border-primary hover:text-primary`}
    >
      {children}
    </button>
  );
};

export default Button;

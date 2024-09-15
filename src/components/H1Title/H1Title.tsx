"use client";

import { FC, PropsWithChildren } from "react";

const H1Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 data-testid="h1-title" className="text-2xl pb-4">
      {children}
    </h1>
  );
};

export default H1Title;

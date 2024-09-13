"use client";

import { FC, PropsWithChildren } from "react";

const H1Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="text-2xl pb-4">{children}</h1>;
};

export default H1Title;

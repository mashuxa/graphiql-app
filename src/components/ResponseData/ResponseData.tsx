"use client";

import { FC } from "react";
import SectionTitle from "src/components/SectionTitle/SectionTitle";

interface ResponseDataProps {
  status: number;
  data: string;
}

const ResponseData: FC<ResponseDataProps> = ({ status, data }) => {
  return (
    <>
      <hr className="mt-8" />
      <SectionTitle>Response:</SectionTitle>

      <p>
        Status: <span>{status}</span>
      </p>
      <p>Body:</p>
      <pre className="overflow-auto">{data}</pre>
    </>
  );
};

export default ResponseData;

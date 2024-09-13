"use client";

import { FC } from "react";

interface ResponseDataProps {
  status: number;
  data: string;
}

const ResponseData: FC<ResponseDataProps> = ({ status, data }) => {
  return (
    <>
      <p>
        Status: <span>{status}</span>
      </p>
      <p>Body:</p>
      <pre className="overflow-auto">{data}</pre>
    </>
  );
};

export default ResponseData;

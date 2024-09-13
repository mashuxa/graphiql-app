"use client";

import beautify from "json-beautify";
import { FC, useMemo } from "react";
import SectionTitle from "src/components/SectionTitle/SectionTitle";

interface ResponseDataProps {
  status: number;
  data: string;
}

const ResponseData: FC<ResponseDataProps> = ({ status, data }) => {
  // @ts-expect-error because of json-beautify incorrect types
  const formattedData = useMemo(() => beautify(data, null, 2, 120), [data]);

  return (
    <>
      <hr className="mt-8" />
      <SectionTitle>Response:</SectionTitle>

      <p>
        Status: <span>{status}</span>
      </p>
      <p>Body:</p>
      <pre className="overflow-auto">{formattedData}</pre>
    </>
  );
};

export default ResponseData;

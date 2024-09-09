"use client";

import { FC } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

interface DocumentExplorerProps {
  data: string;
}

const DocumentExplorer: FC<DocumentExplorerProps> = ({
  data,
}: DocumentExplorerProps) => {
  return (
    <div>
      <hr className="mt-8" />
      <SectionTitle>Document Explorer:</SectionTitle>
      <pre>{data}</pre>
    </div>
  );
};

export default DocumentExplorer;

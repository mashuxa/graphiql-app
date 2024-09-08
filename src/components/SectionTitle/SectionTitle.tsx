import { FC, PropsWithChildren } from "react";

const SectionTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-lg pt-8 pb-4">{children}</h2>
);

export default SectionTitle;

import { FC, PropsWithChildren } from "react";
import SectionTitle from "src/components/SectionTitle/SectionTitle";

interface DetailsProps extends PropsWithChildren {
  title: string;
}

const Details: FC<DetailsProps> = ({ title, children }) => {
  return (
    <details className="group" open>
      <summary className="flex items-center cursor-pointer hover:text-primary">
        <SectionTitle>{title}</SectionTitle>
        <span className="text-4xl mt-4 text-primary transition-transform transform group-open:-rotate-90">
          ◂
        </span>
      </summary>
      {children}
    </details>
  );
};

export default Details;

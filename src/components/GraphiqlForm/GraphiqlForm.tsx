"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import BodyEditor from "../BodyEditor/BodyEditor";
import Button from "../Button/Button";
import HeadersList from "../HeadersList/HeadersList";
import SectionTitle from "../SectionTitle/SectionTitle";
import UrlInput from "../UrlInput/UrlInput";

const GraphiqlForm = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // TODO: add validation
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    console.log("handle submit");
    event.preventDefault();
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    router.push(currentUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <div className="border">
          <UrlInput />
        </div>
        <div className="border">
          <UrlInput isUpdateUrl={false} />
        </div>
      </div>
      <div>
        <Button className="border-none bg-primary px-8 hover:text-secondary">
          SEND
        </Button>
      </div>
      <SectionTitle>Headers:</SectionTitle>
      <HeadersList />

      <SectionTitle>Body:</SectionTitle>
      <BodyEditor readOnly={false} />
    </form>
  );
};

export default GraphiqlForm;

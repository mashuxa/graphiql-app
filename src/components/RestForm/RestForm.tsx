"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import BodyEditor from "src/components/BodyEditor/BodyEditor";
import Button from "src/components/Button/Button";
import HeadersList from "src/components/HeadersList/HeadersList";
import MethodSelector from "src/components/MethodSelector/MethodSelector";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import UrlInput from "src/components/UrlInput/UrlInput";

// todo: Variables section that can shown or hidden, specified variables are included in the body
const RestForm = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // TODO: add validation
  const handleClick = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    router.push(currentUrl);
  };

  return (
    <form onSubmit={handleClick}>
      <div className="flex border">
        <MethodSelector />
        <UrlInput />
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

export default RestForm;

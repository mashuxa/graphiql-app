"use client";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { fetchGraphqlSchema } from "src/fetch/fetchGraphqlSchema";
import { usePathname, useRouter } from "src/i18n.config";
import { store } from "src/store/store";
import { addHistoryItem } from "src/utils/utils";
import BodyEditor, { BodyEditorTypes } from "../BodyEditor/BodyEditor";
import Button from "../Button/Button";
import DocumentExplorer from "../DocumentExplorer/DocumentExplorer";
import HeadersList from "../HeadersList/HeadersList";
import SdlUrlInput from "../SdlUrlInput/SdlUrlInput";
import SectionTitle from "../SectionTitle/SectionTitle";
import UrlInput from "../UrlInput/UrlInput";

const GraphiqlForm = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isShowExplorer, setIsShowExplorer] = useState<string>("false");
  const [docData, setDocData] = useState<string>("");

  // TODO: add validation

  useEffect(() => {
    const isEmptyUrl = window.location.pathname.split("/").length <= 3;

    if (!isEmptyUrl /*&& (isOpenedFromHistory)*/) {
      const isShowExplorerFromLocalStorage =
        localStorage.getItem("isShowDocumentExplorer") || "";

      setIsShowExplorer(isShowExplorerFromLocalStorage);

      const docDataFromStorage =
        localStorage.getItem("documentExplorerData") || "";

      setDocData(docDataFromStorage);
    }
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const sdlUrl = store.getState().requestData.sdlUrl;
    const { status, schema } = await fetchGraphqlSchema(sdlUrl);

    if (status === 200) {
      setIsShowExplorer("true");
      setDocData(schema);
      localStorage.setItem("isShowDocumentExplorer", "true");
      localStorage.setItem("documentExplorerData", schema);
    } else {
      setIsShowExplorer("false");
      localStorage.setItem("isShowDocumentExplorer", "false");
    }
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    addHistoryItem({ url: window.location.href, executed: Date.now() });
    router.push(currentUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <div className="border">
            <UrlInput />
          </div>
          <div className="border">
            <SdlUrlInput />
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
        <BodyEditor readOnly={false} type={BodyEditorTypes.graphql} />
      </form>
      {isShowExplorer === "true" ? <DocumentExplorer data={docData} /> : null}
    </>
  );
};

export default GraphiqlForm;

"use client";

import { useEffect, useState } from "react";
import ResponseData from "src/components/ResponseData/ResponseData";
import useFormAction from "src/hooks/useFormAction/useFormAction";
import BodyEditor, { BodyEditorTypes } from "../BodyEditor/BodyEditor";
import Button from "../Button/Button";
import DocumentExplorer from "../DocumentExplorer/DocumentExplorer";
import HeadersList from "../HeadersList/HeadersList";
import SdlUrlInput from "../SdlUrlInput/SdlUrlInput";
import UrlInput from "../UrlInput/UrlInput";
import VariablesList from "../VariablesList/VariablesList";

//   //todo: вынести sdl в отдельный компонент (и фетч и документацию в сайдбар))
//   const sdlUrl = new FormData(event.currentTarget).get("sdlUrl") as string;
//   const { status, schema } = await fetchGraphqlSchema(sdlUrl);
//
//   if (status === 200) {
//     setIsShowExplorer("true");
//     setDocData(schema);
//     localStorage.setItem("isShowDocumentExplorer", "true");
//     localStorage.setItem("documentExplorerData", schema);
//   } else {
//     setIsShowExplorer("false");
//     localStorage.setItem("isShowDocumentExplorer", "false");
//   }

const GraphiqlForm = (): JSX.Element => {
  const [isShowExplorer, setIsShowExplorer] = useState<string>("false");
  const [docData, setDocData] = useState<string>("");
  const { response, isLoading, handleSubmit } = useFormAction();
  // TODO: add validation

  useEffect(() => {
    const isEmptyUrl = window.location.pathname.split("/").length <= 3;

    if (!isEmptyUrl!) {
      const isShowExplorerFromLocalStorage =
        localStorage.getItem("isShowDocumentExplorer") || "";

      setIsShowExplorer(isShowExplorerFromLocalStorage);

      const docDataFromStorage =
        localStorage.getItem("documentExplorerData") || "";

      setDocData(docDataFromStorage);
    }
  }, []);

  return (
    <>
      <form
        className={isLoading ? "animate-blink" : ""}
        onSubmit={handleSubmit}
      >
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

        <HeadersList />
        <BodyEditor readOnly={false} type={BodyEditorTypes.graphql} />
        <VariablesList />
      </form>
      {isShowExplorer === "true" ? <DocumentExplorer data={docData} /> : null}
      {response && <ResponseData {...response} />}
    </>
  );
};

export default GraphiqlForm;

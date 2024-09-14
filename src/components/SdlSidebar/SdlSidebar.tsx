import { FC, FormEvent, useEffect, useRef, useState } from "react";
import Button from "src/components/Button/Button";
import SdlUrlInput from "src/components/SdlUrlInput/SdlUrlInput";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import { fetchGraphqlSchema } from "src/fetch/fetchGraphqlSchema";

const SDL_LS_KEY = "documentExplorerData";

const SdlSidebar: FC = () => {
  const [docData, setDocData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const sdlUrl = formData.get("sdlUrl") as string;

    try {
      setIsLoading(true);

      const { status, schema } = await fetchGraphqlSchema(sdlUrl);

      if (status === 200) {
        setDocData(schema);
        localStorage.setItem(SDL_LS_KEY, schema);
      } else {
        localStorage.removeItem(SDL_LS_KEY);
      }
    } catch (e) {
      //todo: add notification
      console.error(e);
      //error handler
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isEmptyUrl = window.location.pathname.split("/").length <= 3;

    if (!isEmptyUrl) {
      const docDataFromStorage = localStorage.getItem(SDL_LS_KEY) || "";

      setDocData(docDataFromStorage);
    }
  }, []);

  return (
    <div className={`lg:max-w-80 ${isLoading ? "animate-blink" : ""}`}>
      <form ref={formRef} onSubmit={handleSubmit} className="flex">
        <SdlUrlInput />
        <Button title="fetch sdl">⇅</Button>
      </form>
      <SectionTitle>Document Explorer:</SectionTitle>
      <pre className="lg:overflow-y-auto lg:h-sdl-sidebar px-2 py-4">
        {docData ? docData : "No data"}
      </pre>
    </div>
  );
};

export default SdlSidebar;

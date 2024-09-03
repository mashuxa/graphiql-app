"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Switcher from "src/components/Switcher/Switcher";
import { getUrlData } from "src/utils/headersUtils";
import {
  beautifyGraphql,
  beautifyJson,
  isGraphqlValid,
  isJsonValid,
} from "./BodyEditor.helper";

interface BodyEditorProps {
  readOnly?: boolean;
  type: "rest" | "graphql";
}

export enum ContentType {
  json = "json",
  text = "text",
}
const defaultContentType = ContentType.json;

const validateFunctions = {
  rest: isJsonValid,
  graphql: isGraphqlValid,
};

const beautifyFunctions = {
  rest: beautifyJson,
  graphql: beautifyGraphql,
};

const BodyEditor: FC<BodyEditorProps> = ({
  type = "rest",
  readOnly = true,
}) => {
  const [body, setBody] = useState("");
  const [contentType, setContentType] = useState(defaultContentType);
  const [error, setError] = useState<string>("");

  const validate = (data: string): boolean => {
    const validateFunction = validateFunctions[type]; //(type === "rest") ? isJsonValid : isGraphqlValid;

    if (validateFunction(data)) {
      setError("");
    } else {
      setError(
        `Invalid ${validateFunction} format. Please correct the syntax.`,
      );
    }

    return true;
  };
  const beautify = async (): Promise<void> => {
    const beautifyFunction = beautifyFunctions[type];
    const beautifiedBody = await beautifyFunction(body);

    setBody(beautifiedBody);
  };

  const handleChangeType = (type: string): void => {
    setContentType(type as ContentType);
  };
  const handleChangeBody = ({
    currentTarget,
  }: ChangeEvent<HTMLTextAreaElement>): void => {
    setBody(currentTarget.value);
    validate(currentTarget.value);
  };
  const handleFocus = (): void => setError("");
  const handleBlur = (): void => {
    //to do
    //replaceUrlData(ArgType.body, body);
  };

  useEffect(() => {
    const defaultValue = getUrlData().body;

    if (defaultValue) {
      setBody(defaultValue);
    }
  }, []);

  return (
    <div className="w-full relative pt-4 pb-10">
      <div className="flex justify-between mb-2">
        {type === "rest" ? (
          <Switcher
            name="contentType"
            value={contentType}
            defaultValue={contentType}
            onChange={handleChangeType}
            options={Object.values(ContentType)}
          />
        ) : (
          <div></div>
        )}
        {contentType === ContentType.json && (
          <button
            className="p-2 bg-green-500 text-white rounded block"
            onClick={beautify}
          >
            Beautify JSON
          </button>
        )}
      </div>
      <textarea
        disabled={readOnly}
        name="body"
        className={`w-full min-h-80 border p-4 rounded outline-none ${error && "border-error"}`}
        value={body}
        onFocus={handleFocus}
        onChange={handleChangeBody}
        onBlur={handleBlur}
        placeholder={`Enter ${type === "graphql" ? type : contentType.toString()}`}
      />

      {error && (
        <div className="absolute left-0 bottom-4 text-error">{error}</div>
      )}
    </div>
  );
};

export default BodyEditor;

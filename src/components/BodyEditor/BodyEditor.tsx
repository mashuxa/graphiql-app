"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import HeadersListItem from "src/components/HeadersList/HeadersListItem/HeadersListItem";
import Switcher from "src/components/Switcher/Switcher";
import { ArgType, getUrlData, replaceUrlData } from "src/utils/headersUtils";
import Button from "../Button/Button";
import SectionTitle from "../SectionTitle/SectionTitle";
import {
  beautifyGraphql,
  beautifyJson,
  isGraphqlValid,
  isJsonValid,
} from "./BodyEditor.helper";

export enum BodyEditorTypes {
  rest = "rest",
  graphql = "graphql",
}

interface BodyEditorProps {
  readOnly?: boolean;
  type?: BodyEditorTypes;
}

export enum ContentType {
  json = "json",
  text = "text",
}

const validateFunctions = {
  rest: isJsonValid,
  graphql: isGraphqlValid,
};

const beautifyFunctions = {
  rest: beautifyJson,
  graphql: beautifyGraphql,
};

export const defaultContentType = ContentType.json;

const BodyEditor: FC<BodyEditorProps> = ({
  readOnly = true,
  type = BodyEditorTypes.rest,
}) => {
  const [body, setBody] = useState("");
  const [contentType, setContentType] = useState(defaultContentType);
  const [error, setError] = useState<string>("");
  const [variables, setVariables] = useState<{ key: string; value: string }[]>(
    [],
  );

  const isBodyValid = (data?: string): boolean => {
    const validateFunction = validateFunctions[type];

    if (validateFunction(data)) {
      setError("");

      return true;
    } else {
      setError(`Invalid ${type} format. Please correct the syntax.`);

      return false;
    }
  };

  const beautify = async (): Promise<void> => {
    const beautifyFunction = beautifyFunctions[type];

    if (!isBodyValid(body)) {
      return;
    }
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
    isBodyValid(currentTarget.value);
  };
  const handleFocus = (): void => setError("");
  const handleBlur = (): void => {
    replaceUrlData(ArgType.body, body);
  };

  const handleAddVariable = (): void => {
    setVariables([...variables, { key: "", value: "" }]);
  };

  const handleRemoveVariable = (index: number): void => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleVariableChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ): void => {
    const newVariables = [...variables];

    newVariables[index][field] = value;

    setVariables(newVariables);
    console.log(variables);
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
            type="button"
            className="right-0 top-3 p-2 bg-green-500 text-white rounded"
            onClick={beautify}
          >
            Beautify
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

      <SectionTitle>Variables:</SectionTitle>
      <div className="flex">
        <div className="flex-grow pr-6">
          {variables.map((variable, index) => (
            <HeadersListItem
              key={index}
              index={index}
              header={variable}
              onChange={handleVariableChange}
              onRemove={handleRemoveVariable}
            />
          ))}
        </div>
        <Button
          type="button"
          onClick={handleAddVariable}
          className="bg-neutral-50"
        >
          ➕
        </Button>
      </div>
    </div>
  );
};

export default BodyEditor;

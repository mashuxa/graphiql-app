"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";

import SectionTitle from "src/components/SectionTitle/SectionTitle";
import Switcher from "src/components/Switcher/Switcher";
import { setBody } from "src/store/bodySlice";

import { setContentType } from "src/store/contentTypeSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { ContentType } from "src/types";
import { ArgType, getUrlData, replaceUrlData } from "src/utils/headersUtils";
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

const validateFunctions = {
  rest: isJsonValid,
  graphql: isGraphqlValid,
};

const beautifyFunctions = {
  rest: beautifyJson,
  graphql: beautifyGraphql,
};

const BodyEditor: FC<BodyEditorProps> = ({
  readOnly = true,
  type = BodyEditorTypes.rest,
}) => {
  const contentType = useAppSelector((state) => state.contentType.contentType);
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const body = useAppSelector((state) => state.body.body);
  const variables = useAppSelector((state) => state.variables.variables);

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

    dispatch(setBody(beautifiedBody));
  };

  const handleChangeType = (type: string): void => {
    dispatch(setContentType(type as ContentType));
  };

  const handleChangeBody = ({
    currentTarget,
  }: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setBody(currentTarget.value));
    isBodyValid(currentTarget.value);
  };

  const handleFocus = (): void => setError("");

  const handleBlur = (): void => {
    replaceUrlData(ArgType.body, body, variables);
  };

  useEffect(() => {
    const defaultValue = getUrlData().body;

    if (defaultValue) {
      dispatch(setBody(defaultValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SectionTitle>Body:</SectionTitle>

      <div className="w-full relative pt-4 pb-10">
        <div className="flex justify-between mb-2">
          {type === "rest" ? (
            <Switcher
              name="contentType"
              value={contentType}
              defaultValue={contentType}
              onChange={handleChangeType}
              options={Object.keys(ContentType)}
            />
          ) : (
            <div></div>
          )}

          {contentType === Object.keys(ContentType)[0] && (
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
          className={`w-full min-h-80 border p-4 rounded outline-none shadow-inner bg-neutral-50 ${error && "border-error"}`}
          value={body}
          onFocus={handleFocus}
          onChange={handleChangeBody}
          onBlur={handleBlur}
          placeholder={`Enter ${type === "graphql" ? type : contentType}`}
          data-testid="graphiql-body"
        />

        {error && (
          <div
            data-testid="body-errors"
            className="absolute left-0 bottom-4 text-error"
          >
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default BodyEditor;

"use client";

import beautify from "json-beautify";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Switcher from "src/components/Switcher/Switcher";
import { ArgType, getUrlData, replaceUrlData } from "src/utils/headersUtils";

interface BodyEditorProps {
  readOnly?: boolean;
}

export enum ContentType {
  json = "json",
  text = "text",
}
const defaultContentType = ContentType.json;

const BodyEditor: FC<BodyEditorProps> = ({ readOnly = true }) => {
  const [body, setBody] = useState("");
  const [contentType, setContentType] = useState(defaultContentType);
  const [error, setError] = useState<string>("");

  const validate = (data: string): boolean => {
    try {
      if (contentType === ContentType.json) {
        JSON.parse(data);
        setError("");
      }
    } catch {
      setError("Invalid JSON format. Please correct the syntax.");

      return false;
    }

    return true;
  };
  const beautifyJson = (): void => {
    if (validate(body)) {
      // todo: fix null type error
      // @ts-expect-error because of json-beautify incorrect types
      const beautifiedJson = beautify(JSON.parse(body), null, 2, 120);

      setBody(beautifiedJson);
    }
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
    replaceUrlData(ArgType.body, body);
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
        <Switcher
          name="contentType"
          value={contentType}
          defaultValue={contentType}
          onChange={handleChangeType}
          options={Object.values(ContentType)}
        />
        {contentType === ContentType.json && (
          <button
            type="button"
            className="absolute right-0 top-0 p-2 bg-green-500 text-white rounded"
            onClick={beautifyJson}
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
        placeholder={
          contentType === ContentType.json
            ? "Enter JSON..."
            : "Enter plain text..."
        }
      />

      {error && (
        <div className="absolute left-0 bottom-4 text-error">{error}</div>
      )}
    </div>
  );
};

export default BodyEditor;
"use client";

import beautify from "json-beautify";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Switcher from "src/components/Switcher/Switcher";
import { ArgType, getUrlData, replaceUrlData } from "src/utils/headersUtils";

interface BodyEditorProps {
  readOnly?: boolean;
}

export enum ContentType {
  json = "json",
  text = "text",
}
const defaultContentType = ContentType.json;

const BodyEditor: FC<BodyEditorProps> = ({ readOnly = true }) => {
  const [body, setBody] = useState("");
  const [contentType, setContentType] = useState(defaultContentType);
  const [error, setError] = useState<string>("");

  const validate = (data: string): boolean => {
    try {
      if (contentType === ContentType.json) {
        JSON.parse(data);
        setError("");
      }
    } catch {
      setError("Invalid JSON format. Please correct the syntax.");

      return false;
    }

    return true;
  };
  const beautifyJson = (): void => {
    if (validate(body)) {
      // todo: fix null type error
      // @ts-expect-error because of json-beautify incorrect types
      const beautifiedJson = beautify(JSON.parse(body), null, 2, 120);

      setBody(beautifiedJson);
    }
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
    replaceUrlData(ArgType.body, body);
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
        <Switcher
          name="contentType"
          value={contentType}
          defaultValue={contentType}
          onChange={handleChangeType}
          options={Object.values(ContentType)}
        />
        {contentType === ContentType.json && (
          <button
            type="button"
            className="absolute right-0 top-3 p-2 bg-green-500 text-white rounded"
            onClick={beautifyJson}
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
        placeholder={
          contentType === ContentType.json
            ? "Enter JSON..."
            : "Enter plain text..."
        }
      />

      {error && (
        <div className="absolute left-0 bottom-4 text-error">{error}</div>
      )}
    </div>
  );
};

export default BodyEditor;

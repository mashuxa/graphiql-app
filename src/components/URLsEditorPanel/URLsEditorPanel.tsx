import { FC } from "react";
import { ChangeEventHandler } from "src/types";
import FormField from "../FormField/FormField";

const URLsEditorPanel: FC = () => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = () => {};

  return (
    <div>
      <FormField onChange={handleInputChange} name="endpoint" />
      <FormField onChange={handleInputChange} name="docEndpoint" />
    </div>
  );
};

export default URLsEditorPanel;

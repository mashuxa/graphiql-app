import { FC } from "react";
import FormField from "src/components/FormField/FormField";
import { Header } from "src/types";

export interface HeadersListItemProps {
  itemData: Header;
}

const BaseHeadersListItem: FC<HeadersListItemProps> = ({
  itemData,
}: HeadersListItemProps) => {
  return (
    <>
      <div className="cell">
        <FormField name="key" value={itemData?.key || ""} onChange={() => {}} />
      </div>
      <div className="cell">
        <FormField
          name="value"
          value={itemData?.value || ""}
          onChange={() => {}}
        />
      </div>
    </>
  );
};

export default BaseHeadersListItem;

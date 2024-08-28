import { FC } from "react";
import FormField from "src/components/FormField/FormField";
import { Header } from "src/types";

export interface HeadersListItemProps {
  itemData: Header;
}

const BaseHeadersListItem: FC<HeadersListItemProps> = ({
  itemData,
}: HeadersListItemProps) => {
  const cellClass = "-mt-px mr-0 mb-0 -ml-px border-0 -outline-offset-2";

  return (
    <>
      <div className={cellClass}>
        <FormField name="key" value={itemData?.key || ""} onChange={() => {}} />
      </div>
      <div className={cellClass}>
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

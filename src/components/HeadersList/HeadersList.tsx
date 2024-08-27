import { FC, LiHTMLAttributes } from "react";
import { Header } from "src/types";
import List from "../List/List";

import HeadersListItem from "./HeadersListItem/HeadersListItem";
import NewHeadersListItem from "./NewHeadersListItem/NewHeadersListItem";

interface HeaderListProps extends LiHTMLAttributes<HTMLLIElement> {
  data: Header[];
  updateData: (id: string, item: Header) => void;
}

const HeadersList: FC<HeaderListProps> = ({
  data,
  updateData,
}: HeaderListProps): React.ReactNode => {
  return (
    <>
      <List<Header>
        listHeader="Headers"
        columnHeaders={["Key", "Value"]}
        data={data}
        updateData={updateData}
        itemRender={HeadersListItem}
        newItemRender={NewHeadersListItem}
        newItemDefaults={{ id: "new", key: "", value: "" }}
      />
    </>
  );
};

export default HeadersList;

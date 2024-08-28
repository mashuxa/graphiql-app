import Image from "next/image";
import { FC } from "react";
import { Header } from "src/types";
import BaseHeadersListItem from "../BaseHeadersListItem/BaseHeadersListItem";

export interface HeadersListItemProps {
  itemData: Header;
}

const HeadersListItem: FC<HeadersListItemProps> = ({
  itemData,
}: HeadersListItemProps) => {
  return (
    <>
      <BaseHeadersListItem itemData={itemData} />
      <button className="ml-2">
        <Image
          src="/delete.png"
          alt="New list item icon"
          width={24}
          height={24}
        />
      </button>
    </>
  );
};

export default HeadersListItem;

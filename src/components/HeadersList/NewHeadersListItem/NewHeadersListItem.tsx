import Image from "next/image";
import { FC } from "react";
import { Header } from "src/types";
import HeadersListItem from "../HeadersListItem/HeadersListItem";

export interface NewHeadersListItemProps {
  itemData: Header;
}

const NewHeadersListItem: FC<NewHeadersListItemProps> = ({
  itemData,
}: NewHeadersListItemProps) => {
  return (
    <>
      <HeadersListItem itemData={itemData} />
      <button>
        <Image src="/add.png" alt="New list item icon" width={24} height={24} />
      </button>
    </>
  );
};

export default NewHeadersListItem;

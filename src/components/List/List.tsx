import { LiHTMLAttributes } from "react";
import ListItems from "./ListItems/ListItems";
import NewListItem from "./NewListItem/NewListItem";

interface ListProps<T> extends LiHTMLAttributes<HTMLLIElement> {
  listHeader?: string;
  columnHeaders?: string[];
  data: T[];
  itemRender: React.FC<{ itemData: T }>;
  newItemRender: React.FC<{ itemData: T }>;
  updateData: (id: string, item: T) => void;
  newItemDefaults: T;
}

const List = <T extends { key: string; id: string }>({
  listHeader,
  columnHeaders,
  data,
  itemRender,
  newItemRender,
  updateData,
  newItemDefaults,
  ...rest
}: ListProps<T>): React.ReactNode => {
  const liClassName = "flex";
  const cellClass = "-mt-px mr-0 mb-0 -ml-px border text-center align-middle";

  return (
    <div className="w-full">
      <ul className="w-full">
        {listHeader ? <h3 className="font-semibold">{listHeader}</h3> : null}
        <li className={`${liClassName} h-10 leading-10`} {...rest}>
          {columnHeaders?.map((header) => (
            <div key={header} className={`cell ${cellClass} w-full`}>
              {header}
            </div>
          ))}
          <div className="min-w-6 ml-2"></div>
        </li>
        <ListItems
          data={data}
          itemRender={itemRender}
          updateData={updateData}
        />
        <NewListItem
          defaultData={newItemDefaults}
          itemRender={newItemRender}
          className={liClassName}
          updateData={updateData}
        />
      </ul>
    </div>
  );
};

export default List;

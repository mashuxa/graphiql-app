export interface Header {
  id: string;
  key: string;
  value: string;
}

export type OnRemoveType = (index: number) => void;

export type OnChangeType = (
  index: number,
  fieldName: string,
  value: string,
) => void;

export interface UseHeadersListReturnType {
  headers: Header[];
  addNewItem: () => void;
  removeItem: OnRemoveType;
  updateItem: OnChangeType;
}

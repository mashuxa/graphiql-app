import { ChangeEvent, FC, memo, useCallback } from "react";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import {
  Header,
  OnChangeType,
  OnRemoveType,
} from "src/hooks/useHeadersList/types";

interface HeadersListItemProps {
  index: number;
  header: Header;
  onRemove: OnRemoveType;
  onChange: OnChangeType;
}

const groupClassName = "group-hover:bg-neutral-50";

const HeadersListItem: FC<HeadersListItemProps> = ({
  index,
  header,
  onRemove,
  onChange,
}) => {
  const handleRemove = useCallback(
    (): void => onRemove(index),
    [index, onRemove],
  );
  const handleChangeKey = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>): void =>
      onChange(index, "key", currentTarget.value),
    [index, onChange],
  );
  const handleChangeValue = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>): void =>
      onChange(index, "value", currentTarget.value),
    [index, onChange],
  );

  return (
    <fieldset className="flex group">
      <FormField
        className={groupClassName}
        defaultValue={header.key}
        onChange={handleChangeKey}
      />
      <FormField
        className={groupClassName}
        defaultValue={header.value}
        onChange={handleChangeValue}
      />
      <Button
        className={`${groupClassName} transition opacity-30 hover:opacity-100`}
        onClick={handleRemove}
        type="button"
      >
        ❌
      </Button>
    </fieldset>
  );
};

export default memo(HeadersListItem);

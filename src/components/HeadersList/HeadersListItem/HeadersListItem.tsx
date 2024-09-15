import { ChangeEvent, FC, memo, useCallback } from "react";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { Header } from "src/components/HeadersList/types";

interface HeadersListItemProps {
  index: number;
  header: Header;
  onRemove: (index: number) => void;
  onChange: (index: number, field: "key" | "value", value: string) => void;
  onBlur?: () => void;
}

const groupClassName =
  "flex-grow group-hover:bg-neutral-50 shadow-inner bg-neutral-50";

const HeadersListItem: FC<HeadersListItemProps> = ({
  index,
  header,
  onRemove,
  onChange,
  onBlur,
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
    <fieldset className="flex group gap-2">
      <FormField
        className={groupClassName}
        value={header.key}
        onChange={handleChangeKey}
        {...(onBlur && { onBlur })}
        type="text"
        pattern="^[A-Za-z0-9\-]*$"
        title="Only letters, numbers, and hyphens are allowed"
      />
      <FormField
        className={groupClassName}
        value={header.value}
        onChange={handleChangeValue}
        {...(onBlur && { onBlur })}
      />
      <Button
        className={`${groupClassName} flex-grow-0 transition opacity-30 hover:opacity-100 hover:text-error text-md text-error`}
        onClick={handleRemove}
        type="button"
        data-testid="removeHeaderButton"
      >
        ✖
      </Button>
    </fieldset>
  );
};

export default memo(HeadersListItem);

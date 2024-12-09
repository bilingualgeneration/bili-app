import { Control, Controller } from "react-hook-form";
import { IonCheckbox } from "@ionic/react";

import { FC, JSX, useState, useEffect } from "react";

export type MultipleCheckboxOption = {
  value: any;
  label: string | undefined | null;
};

type IonCheckboxProps = {
  alignment: "center" | "start";
  checked: boolean;
  color:
    | "danger"
    | "dark"
    | "light"
    | "medium"
    | "primary"
    | "secondary"
    | "success"
    | "tertiary"
    | "warning"
    | string
    | undefined;
  disabled: boolean;
  indeterminate: boolean;
  justify: "end" | "space-between" | "start";
  labelPlacement: "end" | "fixed" | "stacked" | "start";
  // legacy: boolean | undefined, // don't support legacy
  mode: "ios" | "md";
  name: string;
  value: any;
};

type MultipleCheckboxAdditionalProps = {
  control: Control<any>;
  defaultValue: string[];
  name: string;
  onChange?: (arg: any) => void;
  options: MultipleCheckboxOption[];
  testId: string;
  wrapper: FC<{ children: JSX.Element }>;
  maxSelections?: number;
  minSelections?: number;
};

export type MultipleCheckboxProps = Partial<IonCheckboxProps> &
  Partial<MultipleCheckboxAdditionalProps> &
  Pick<IonCheckboxProps, "name"> &
  Pick<MultipleCheckboxAdditionalProps, "control">;

export const MultipleCheckbox = ({
  control,
  defaultValue = [],
  name,
  options = [],
  testId,
  wrapper: Wrapper = ({ children }) => children,
  onChange: onChangeProps,
  maxSelections,
  minSelections = 0,
  ...props
}: MultipleCheckboxProps): JSX.Element => {
  const [values, setValues] = useState<string[]>(defaultValue);

  // TODO: this seems bugged
  /*
  useEffect(() => {
      setValues(defaultValue);
  }, [defaultValue]);
  */

  return (
    <Controller
      control={control}
      data-testid={testId || "extended-radio-component"}
      name={name}
      render={({ field: { onChange, value } }): JSX.Element => (
        <>
          {options.map((option) => (
            <Wrapper key={option.value}>
              <IonCheckbox
                checked={values.includes(option.value)}
                disabled={
                  values.includes(option.value) &&
                  values.length <= minSelections
                }
                onIonChange={(event) => {
                  let newValues: string[];
                  if (event.detail.checked) {
                    newValues = [...values, option.value];
                  } else {
                    newValues = values.filter((v) => v !== option.value);
                  }
                  // remove any duplicates that may have popped up
                  newValues = Array.from(new Set(newValues));

                  // if maxSelections is defined
                  // and if number of selections exceeds maxSelections
                  // deselect older selections in FIFO
                  while (
                    maxSelections !== undefined &&
                    newValues.length > maxSelections
                  ) {
                    newValues = newValues.slice(1);
                  }
                  setValues(newValues);
                  onChange(newValues);
                  if (onChangeProps) {
                    onChangeProps(newValues);
                  }
                }}
                value={option.value}
                {...props}
              >
                {option.label}
              </IonCheckbox>
            </Wrapper>
          ))}
        </>
      )}
    />
  );
};

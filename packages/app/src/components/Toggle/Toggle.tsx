import { JSX } from "react";
import { Control, Controller } from "react-hook-form";
import { IonToggle } from "@ionic/react";

export type IonToggleProps = {
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
  enableOnOffLabels: boolean | undefined;
  justify: "end" | "space-between" | "start";
  labelPlacement: "fixed" | "floating" | "stacked" | undefined;
  legacy: boolean | undefined;
  mode: "ios" | "md";
  name: string;
  value: null | string | undefined;
};

export type ToggleAdditionalProps = {
  control: Control<any>;
  label: string | JSX.Element;
  testId: string | undefined;
};

export type ToggleProps = Partial<IonToggleProps> &
  Partial<ToggleAdditionalProps> &
  Pick<IonToggleProps, "name"> &
  Pick<ToggleAdditionalProps, "control">;

export const Toggle = ({
  control,
  label,
  ...props
}: ToggleProps): JSX.Element => {
  return (
    <>
      <Controller
        name={props.name}
        control={control}
        render={({
          field: { onChange, onBlur, value, ...fields },
        }: any): JSX.Element => (
          <IonToggle
            {...fields}
            {...props}
            checked={value}
            onIonChange={(event) => {
              onChange(event.detail.checked);
            }}
          >
            {label}
          </IonToggle>
        )}
      />
    </>
  );
};

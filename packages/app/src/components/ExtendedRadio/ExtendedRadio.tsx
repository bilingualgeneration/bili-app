import { createElement, Fragment, JSX, useState } from "react";

import { Control, Controller } from "react-hook-form";

export type ExtendedRadioOption = {
  component: JSX.Element;
  value: string | number;
  disabled?: boolean;
};

// todo: add clear button?
export type ExtendedRadioProps = {
  activeClassName?: string;
  control: Control<any>;
  disabledClass?: string;
  name: string;
  options: ExtendedRadioOption[];
  testId?: string;
};

export const ExtendedRadio = ({
  activeClassName = "active",
  control,
  disabledClass = "disabled",
  name,
  options,
  testId = "extended-radio-component",
}: ExtendedRadioProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (index: number): void => {
    setActiveIndex(index);
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }): JSX.Element => (
        <span data-testid={testId}>
          {options.map((option, index) => {
            const props = {
              ...option.component.props,
              key: index,
              className:
                option.component.props.className +
                (activeIndex === index ? " " + activeClassName : ""),
              onClick: () => {
                if (!option.disabled) {
                  setActiveIndex(index);
                  onChange(option.value);
                }
              },
            };
            return <option.component.type {...props} key={index} />;
          })}
        </span>
      )}
    />
  );
};

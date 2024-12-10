import React, { useEffect } from "react";
import { createElement, Fragment, JSX, useState } from "react";

import { Control, Controller } from "react-hook-form";

export type ExtendedRadioOption = {
  component: JSX.Element;
  value: any;
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
  displayCardsInRow?: boolean;
  defaultOption?: ExtendedRadioOption | undefined;
  isMaxWidthNeeded?: boolean;
  maxWidth?: string;
};

export const ExtendedRadio = ({
  activeClassName = "active",
  control,
  disabledClass = "disabled",
  name,
  options,
  testId = "extended-radio-component",
  displayCardsInRow = false,
  isMaxWidthNeeded = false,
  maxWidth,
  defaultOption,
}: ExtendedRadioProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(
    defaultOption
      ? options.findIndex((option) => option.value === defaultOption.value)
      : -1,
  );

  useEffect(() => {
    if (defaultOption) {
      const index = options.findIndex(
        (option) => option.value === defaultOption.value,
      );
      setActiveIndex(index !== -1 ? index : -1);
    }
  }, [defaultOption, options]);

  const handleClick = (index: number): void => {
    setActiveIndex(index);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }): JSX.Element => (
        <span data-testid={testId}>
          <div className={displayCardsInRow ? "price-cards" : ""}>
            {options.map((option, index) => {
              const props = {
                ...option.component.props,
                key: index,
                // todo: Invalid prop `className` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.
                className:
                  option.component.props.className +
                  (activeIndex === index ? " " + activeClassName : "") +
                  (isMaxWidthNeeded ? " max-width-needed" : ""),
                style: isMaxWidthNeeded && maxWidth ? { maxWidth } : {},
                onClick: () => {
                  if (!option.disabled) {
                    setActiveIndex(index);
                    onChange(option.value);
                  }
                },
              };
              return <option.component.type {...props} key={index} />;
            })}
          </div>
        </span>
      )}
    />
  );
};

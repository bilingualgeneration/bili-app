import React from "react";
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
  useModifiedBehavior?: boolean;
};

export const ExtendedRadio = ({
  activeClassName = "active",
  control,
  disabledClass = "disabled",
  name,
  options,
  testId = "extended-radio-component",
  useModifiedBehavior = false,
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
          <div className={useModifiedBehavior ? "price-cards" : ""}>
            {" "}
            {/* Wrapped the cards in a container if using modified behavior */}
            {options.map((option, index) => (
              <div
                key={index}
                className={useModifiedBehavior ? "price-card-item" : ""}
              >
                {" "}
                {/* Set a class for each card if using modified behavior */}
                {React.cloneElement(option.component, {
                  onClick: () => {
                    if (!option.disabled) {
                      setActiveIndex(index);
                      onChange(option.value);
                    }
                  },
                  className:
                    option.component.props.className + // Original className
                    (useModifiedBehavior && activeIndex === index
                      ? " " + activeClassName
                      : ""), // Add active class conditionally if using modified behavior
                })}
              </div>
            ))}
          </div>
        </span>
      )}
    />
  );
};

import { IonPopover } from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import React from "react";
import { string } from "zod";

type PopoverProps = {
  content: string | MessageFormatElement[];
  trigger: string;
};

export const Popover: React.FC<PopoverProps> = ({ content, trigger }) => {
  return (
    <IonPopover trigger={trigger} triggerAction="click" showBackdrop={false}>
      <p style={{ padding: "10px" }}>{content as string}</p>
    </IonPopover>
  );
};

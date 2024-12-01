import { IonContent, IonPopover } from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import React, { useRef, useState } from "react";
import { string } from "zod";

type PopoverProps = {
  content: string | MessageFormatElement[];
  trigger: string;
};

export const Popover: React.FC<PopoverProps> = ({ content, trigger }) => {
  return (
    <IonPopover
      trigger={trigger}
      triggerAction="hover"
      showBackdrop={false}
      dismissOnSelect={true}
    >
      <p style={{ padding: "0.625rem" }}>{content as string}</p>
    </IonPopover>
  );
};

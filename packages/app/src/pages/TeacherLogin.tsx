import React from "react";
import { IonInput, IonButton } from "@ionic/react";
import { FormattedMessage } from "react-intl";

const TeacherLogin: React.FC = () => {
  const handleTeacherLogin = () => {
    // Handle teacher login logic here
  };

  return (
    <>
      <h1>
        <FormattedMessage
          id="login.teacherWelcome"
          defaultMessage="Welcome to Teacher Login Page"
          description="Welcome message for teacher login"
        />
      </h1>
      <IonInput placeholder="Username" />{" "}
      {/* Cannot add react-intl bc it is expecting string. Line to be added --> <FormattedMessage id="login.teacherUsername" defaultMessage="Username" /> */}
      <IonInput placeholder="Password" type="password" />{" "}
      {/* Cannot add react-intl bc it is expecting string. Line to be added --> <FormattedMessage id="login.teacherPassword" defaultMessage="Password" /> */}
      <IonButton expand="block" onClick={handleTeacherLogin}>
        <FormattedMessage
          id="login.teacher"
          defaultMessage="Login as Teacher"
          description="Login spot for teachers"
        />
      </IonButton>
    </>
  );
};

export default TeacherLogin;

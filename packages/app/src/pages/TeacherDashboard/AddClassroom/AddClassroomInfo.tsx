import { FormattedMessage } from "react-intl";
import { Input } from "@/components/Input";
import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  MultipleCheckbox,
  MultipleCheckboxOption,
} from "@/components/MultipleCheckbox";
import { useAddClassroom } from "./AddClassroomContext";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { z, isValid } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./AddClassroomInfo.css";

const OptionWrapper = ({ children }: { children: JSX.Element }) => {
  return <IonCol size="4">{children}</IonCol>;
};

export const AddClassroomInfo: React.FC = () => {
  const schema = z.object({
    name: z.string(),
    grades: z.string().array(),
  });
  const { grades, name, setGrades, setName } = useAddClassroom();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      grades,
      name,
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const gradesOptions: MultipleCheckboxOption[] = [
    {
      label: "Pre-K",
      value: "p",
    },
    {
      label: "Kindergarten",
      value: "k",
    },
    {
      label: "1st Grade",
      value: "1",
    },
    {
      label: "2nd Grade",
      value: "2",
    },
    {
      label: "3rd Grade",
      value: "3",
    },
    {
      label: "Other",
      value: "o",
    },
  ];
  const history = useHistory();

  //button logic
  const onSubmit = handleSubmit((responses) => {
    setName(responses.name);
    setGrades(responses.grades);
    history.push("/classrooms/add/language");
  });

  return (
    <>
      <div>
        <IonCard style={{ maxWidth: 580, margin: "auto", marginTop: "1.5rem" }}>
          <div style={{ width: "33%", margin: "auto" }}>
            <IonProgressBar color="primary" value={0.2} />
          </div>
          <form id="class-about-styles">
            <div className="margin-bottom-2">
              <IonText className="ion-text-center">
                <h1 className="text-3xl semibold color-suelo">
                  <FormattedMessage id="teacherDashboard.addClassroom.infoTitle" />
                </h1>
              </IonText>
            </div>

            <div className="classroom-input-styles">
              <Input
                label="Class Name"
                labelPlacement="above"
                required={true}
                name="name"
                fill="outline"
                control={control}
                helperText="Guidance about how to name the classroom"
                testId="teacher-account-credentials-name-input"
                type="text"
                className="classroom-name-input"
              />
            </div>

            <div className="margin-bottom-1 margin-top-2">
              <IonText>
                <h2 className="text-xl semibold color-suelo">
                  What grade(s) are in this class?
                </h2>
              </IonText>
            </div>
            <div className="text-md color-suelo grades-styles">
              <IonGrid>
                <IonRow>
                  <MultipleCheckbox
                    control={control}
                    labelPlacement="end"
                    options={gradesOptions}
                    name="grades"
                    wrapper={OptionWrapper}
                  />
                </IonRow>
              </IonGrid>
            </div>

            <div style={{ width: "66%", margin: "auto" }}>
              <IonButton
                className="margin-top-2 elevate"
                expand="block"
                shape="round"
                type="button"
                data-testid="teacher-about-continue-button"
                disabled={!isValid}
                onClick={onSubmit}
              >
                <FormattedMessage id="common.continue" />
              </IonButton>
            </div>
          </form>
        </IonCard>
      </div>
    </>
  );
};

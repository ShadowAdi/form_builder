import { TextFieldFormElement } from "../fields/TextField";
import { IconType } from "react-icons/lib";
import { TitleFieldFormElement } from "../fields/TitleField";
import { SubTitleFieldFormElement } from "../fields/SubTitleField";
import { ParagraphFieldFormElement } from "../fields/ParagraphField";
import { SeparatorFieldFormElement } from "../fields/SeparatorField";
import { SpacerFieldFormElement } from "../fields/SpacerField";
import { NumberFieldFormElement } from "../fields/NumberField";
import { DateFieldFormElement } from "../fields/DateField";
import { SelectFieldFormElement } from "../fields/SelectField";
import { CheckBoxFormElement } from "../fields/CheckboxField";
import { TextAreaFormElement } from "../fields/TextAreaField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

export type SubmitFunc = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElements: {
    icon: IconType;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckBoxFormElement,
};

import './InfoField.css'
import { Checkbox, Switch } from "antd";
import { PersonalInfoFieldProps } from "../../types/data";

// Define the type for the personalInfo state

const fieldDisplayNames: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  emailId: "Email ID",
  phoneNumber: "Phone number",
  nationality: "Nationality",
  currentResidence: "Current Residence",
  idNumber: "ID Number",
  dateOfBirth: "Date of Birth",
  gender: "Gender",
};

const PersonalInfoField = ({
  fieldKey,
  personalInfo,
  onCheckboxChange,
  onSwitchChange,
}: PersonalInfoFieldProps) => {
  const field = personalInfo[fieldKey];
  const displayName = fieldDisplayNames[fieldKey];

  return (
    <label
      style={{
        borderBottom: "1px solid var(--grey)",
        paddingBottom: "20px",
      }}
      key={fieldKey}
      className="container"
    >
      <div className="left">
        <h3>{displayName}</h3>
      </div>
      <div className="right">
        <Checkbox
          checked={field.internalUse}
          onChange={() => onCheckboxChange(fieldKey)}
        >
          Internal
        </Checkbox>
        <Switch
          defaultChecked={field.show}
          onChange={(checked) => onSwitchChange(fieldKey, checked)}
        />
      </div>
    </label>
  );
};

export default PersonalInfoField;

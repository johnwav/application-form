import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import './PersonalInfo.css'
import { Checkbox, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPersonalInformation as setPersonalInfo } from "../../data/dataSlice";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector(
    (state: RootState) => state.data.data.attributes.personalInformation
  );

  const [personalInformation, setPersonalInformation] = useState(personalInfo);
  const info = [
    "phoneNumber",
    "nationality",
    "currentResidence",
    "idNumber",
    "dateOfBirth",
    "gender",
  ];

  const handleCheckboxChange = (attributeName, updatedData) => {
    setPersonalInformation((prev) => ({
      ...prev,
      [attributeName]: {
        ...prev[attributeName],
        internalUse: updatedData,
      },
    }));
    dispatch(setPersonalInfo(personalInformation));
  };
  const handleSwitchChange = (attributeName, updatedData) => {
    setPersonalInformation((prev) => ({
      ...prev,
      [attributeName]: {
        ...prev[attributeName],
        show: updatedData,
      },
    }));
    dispatch(setPersonalInfo(personalInformation));
  };

  useEffect(() => {
    console.log(personalInformation);
  }, [personalInformation]);

  return (
    <div>
      <div
        style={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label
          style={{
            borderBottom: "1px solid var(--grey)",
            paddingBottom: "20px",
          }}
        >
          <h3>First Name</h3>
        </label>
        <label
          style={{
            borderBottom: "1px solid var(--grey)",
            paddingBottom: "20px",
          }}
        >
          <h3>Last Name</h3>
        </label>
        <label
          style={{
            borderBottom: "1px solid var(--grey)",
            paddingBottom: "20px",
          }}
        >
          <h3>Email</h3>
        </label>
        {info.map((item, index) => (
          <label
            key={index}
            style={{
              borderBottom: "1px solid var(--grey)",
              paddingBottom: "20px",
            }}
            className="container"
          >
            <div className="left">
              <h3>{item}</h3>
            </div>
            <div className="right">
              <Checkbox
                checked={personalInformation[item].internalUse}
                onChange={(e) => handleCheckboxChange(item, e.target.checked)}
              >
                Internal
              </Checkbox>
              <Switch
                defaultChecked={personalInformation[item].show}
                onChange={(checked) => handleSwitchChange(item, checked)}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfo;

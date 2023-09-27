import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./PersonalInfo.css";
import { Checkbox, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPersonalInformation as setPersonalInfo } from "../../data/dataSlice";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddQuestion from "../AddQuestion/AddQuestion";
import Question from "../Question/Question";
import { QuestionTemplate } from "../../types/types";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(null);
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

  //@ts-ignore
  const handleDeleteQuestion = (questionToDelete) => {
    setShowAddQuestion(false); // Close the AddQuestion component

    // Check if the question being deleted is the edited question
    if (editedQuestion && editedQuestion.id === questionToDelete.id) {
      setEditedQuestion(null); // Clear the edited question state
    }

    // Remove the question from personalInformation state
    setPersonalInformation((prev) => ({
      ...prev,
      personalQuestions: prev.personalQuestions.filter(
        (q) => q.id !== questionToDelete.id
      ),
    }));

    questionToDelete && console.log(questionToDelete, "deleted");
  };

  const updateQuestion = (updatedQuestion: QuestionTemplate) => {
    console.log('ne question',updatedQuestion)
    // Create a copy of personalInformation
    const updatedPersonalInfo = { ...personalInformation };

    // Find the index of the question to be updated
    const questionIndex = updatedPersonalInfo.personalQuestions.findIndex(
      (q) => q.id === updatedQuestion.id
    );

    console.log(questionIndex)

    if (questionIndex !== -1) {
      // Create a new array with the updated question
      const updatedQuestions = [...updatedPersonalInfo.personalQuestions];
      updatedQuestions[questionIndex] = updatedQuestion;

      // Update the copy of personalInformation with the new questions array
      updatedPersonalInfo.personalQuestions = updatedQuestions;

      // Update the state with the new personalInformation
      setPersonalInformation(updatedPersonalInfo);

      // Dispatch the updated personalInformation to Redux
      dispatch(setPersonalInfo(updatedPersonalInfo));
    } else {
      console.log("not found");
    }
  };

  useEffect(() => {
    // console.log(personalInformation);
    console.log(personalInformation);
  }, [personalInfo]);

  useEffect(() => {
    dispatch(setPersonalInfo(personalInformation));
  }, [personalInformation]);

  return (
    <>
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

        {personalInformation.personalQuestions.map((question, index) => (
          <Question
            onDeleteQuestion={handleDeleteQuestion}
            key={index}
            question={question}
            onEditQuestion={(newQuestion) => {
              setEditedQuestion(question);
              //////
              updateQuestion(newQuestion);
            }}
          />
        ))}

        {showAddQuestion && (
          <AddQuestion
            onSaveQuestion={(newQuestion) => {
              // Push the newQuestion to personalInformation state
              setPersonalInformation((prev) => ({
                ...prev,
                personalQuestions: [...prev.personalQuestions, newQuestion],
              }));

              setEditedQuestion(newQuestion);

              // Close the AddQuestion component
              setShowAddQuestion(false);
            }}
            editedQuestion={editedQuestion} // Pass the edited question here
            onDeleteQuestion={handleDeleteQuestion}
          />
        )}

        <label
          style={{
            marginTop: "50px",
            cursor: "pointer",
          }}
        >
          <div
            onClick={() => {
              setEditedQuestion(null); // Clear any edited question
              setShowAddQuestion(true);
            }}
            style={{ display: "flex", gap: "20px" }}
            className="add"
          >
            <PlusIcon />
            <strong>Add a Question</strong>
          </div>
        </label>
      </div>
    </>
  );
};

export default PersonalInfo;

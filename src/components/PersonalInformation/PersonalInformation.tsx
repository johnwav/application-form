import { useDispatch, useSelector } from "react-redux";
import {
  setPersonalInfo, // Import the action from your Redux data slice
  addPersonalQuestion, // Import the action from your Redux data slice
  editPersonalQuestion, // Import the action from your Redux data slice
  deletePersonalQuestion, // Import the action from your Redux data slice
} from "../../data/dataSlice"; // Import your Redux data slice
import generateUniqueId from "../../generateId";
import { useEffect, useState } from "react";
import PersonalInfoField from "../InfoField/InfoField";
import QuestionComponent from "../Question/Question";
import PlusIcon from "../../assets/icons/PlusIcon";
import SavedQuestion from "../SavedQuestion/SavedQuestion";
import { QuestionTemplate as Question } from "../../types/types";

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector(
    (state) => state.data.applicationForm.attributes.personalInformation
  );

  const handleCheckboxChange = (fieldKey: string) => {
    // Dispatch the action to update the Redux state
    dispatch(
      setPersonalInfo({
        ...personalInfo,
        [fieldKey]: {
          ...personalInfo[fieldKey],
          internalUse: !personalInfo[fieldKey].internalUse,
        },
      })
    );
  };

  const handleSwitchChange = (fieldKey: string, checked: boolean) => {
    // Dispatch the action to update the Redux state
    dispatch(
      setPersonalInfo({
        ...personalInfo,
        [fieldKey]: {
          ...personalInfo[fieldKey],
          show: checked,
        },
      })
    );
  };

  const addQuestion = () => {
    const newQuestion = {
      id: generateUniqueId(),
      type: "Paragraph",
      question: null,
      choices: [],
      maxChoice: 0,
      disqualify: false,
      other: false,
    };

    // Dispatch the action to add a new personal question
    dispatch(addPersonalQuestion(newQuestion));
  };

  const handleQuestionChange = (updatedQuestion) => {
    // Dispatch the action to edit a personal question
    dispatch(editPersonalQuestion(updatedQuestion));
  };

  const deleteQuestion = (questionId: string) => {
    // Dispatch the action to delete a personal question
    dispatch(deletePersonalQuestion(questionId));
  };
  const keysToInclude = Object.keys(personalInfo).filter(
    (fieldKey) =>
      fieldKey !== "personalQuestions" &&
      fieldKey !== "firstName" &&
      fieldKey !== "lastName" &&
      fieldKey !== "emailId"
  );
  const [currentlyEditedQuestion, setCurrentlyEditedQuestion] =
    useState<Question | null>(null);

  const exitEditingMode = () => {
    console.log("saved");
    setCurrentlyEditedQuestion(null);
    setIsEditingQuestion(false);
  };

  // Function to handle editing a question
  const editQuestion = (questionId: string) => {
    // Find the question by ID and set it as the currently edited question
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const editedQuestion = personalInfo.personalQuestions.find(
      (question: Question) => question.id === questionId
    );
    if (editedQuestion) {
      setCurrentlyEditedQuestion(editedQuestion);
      setIsEditingQuestion(true); // Set editing mode to true
    }
  };
  const renderSavedQuestions = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return personalInfo.personalQuestions.map((question: Question) => (
      <SavedQuestion
        key={question.id}
        question={question}
        onEdit={() => editQuestion(question.id)}
      />
    ));
  };

  const [isEditingQuestion, setIsEditingQuestion] = useState(false);

  useEffect(() => {
    console.log(personalInfo);
  }, [personalInfo]);

  return (
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
      {keysToInclude.map((fieldKey) => (
        <PersonalInfoField
          key={fieldKey}
          fieldKey={fieldKey}
          personalInfo={personalInfo}
          onCheckboxChange={handleCheckboxChange}
          onSwitchChange={handleSwitchChange}
        />
      ))}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {isEditingQuestion && currentlyEditedQuestion ? (
        <QuestionComponent
          question={currentlyEditedQuestion}
          onQuestionChange={handleQuestionChange}
          onDeleteQuestion={() => deleteQuestion(currentlyEditedQuestion.id)}
          onSave={exitEditingMode}
        />
      ) : null}
      {renderSavedQuestions()}

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {personalInfo.personalQuestions.map((question: Question) => (
        <QuestionComponent
          key={question.id}
          question={question}
          onQuestionChange={handleQuestionChange}
          onDeleteQuestion={() => deleteQuestion(question.id)}
          onSave={exitEditingMode}
        />
      ))}

      {/* Render saved questions */}

      {/* Render the currently edited question using QuestionComponent */}
      {/* Render the currently edited question using QuestionComponent or SavedQuestion */}
      {isEditingQuestion && currentlyEditedQuestion ? (
        <QuestionComponent
          question={currentlyEditedQuestion}
          onQuestionChange={handleQuestionChange}
          onDeleteQuestion={() => deleteQuestion(currentlyEditedQuestion.id)}
          onSave={exitEditingMode}
        />
      ) : (
        currentlyEditedQuestion && (
          <SavedQuestion
            question={currentlyEditedQuestion}
            onEdit={() => editQuestion(currentlyEditedQuestion.id)}
          />
        )
      )}

      {/* <div>
            <span>Yes/No</span>
            <div>
              <span>Have you ever been rejected by the UK embassy?</span>
              <button>edit</button>
            </div>
          </div> */}

      <label
        style={{
          paddingTop: "50px",
          cursor: "pointer",
        }}
      >
        <div
          onClick={addQuestion}
          style={{ display: "flex", gap: "20px" }}
          className="add"
        >
          <PlusIcon />
          <strong>Add a Question</strong>
        </div>
      </label>
    </div>
  );
};

export default PersonalInformation;

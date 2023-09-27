import {
  Input,
  Select,
  // Checkbox
} from "antd";
import { QuestionsTypeOptions } from "./Items";
import CloseIcon from "../../assets/icons/CloseIcon";
// import OrderedList from "../../assets/icons/OrderedList";
// import PlusIcon from "../../assets/icons/PlusIcon";
import "./AddQuestion.css";
import { QuestionTemplate } from "../../types/types";
import { useState } from "react";
import generateUniqueId from "../../generateId";

const AddQuestion = ({
  onSaveQuestion,
  onDeleteQuestion,
  editedQuestion,
}: {
  onSaveQuestion: (question: QuestionTemplate) => void;
  onDeleteQuestion: (question: QuestionTemplate) => void;
  editedQuestion: QuestionTemplate;
}) => {
  const typeOptions = QuestionsTypeOptions.map((questionType) => ({
    value: questionType,
    label: questionType,
  }));

  const { uniqueId } = generateUniqueId();

  // Local state for question type and question text
  const [questionType, setQuestionType] = useState(editedQuestion?.type || "");
  const [questionText, setQuestionText] = useState(editedQuestion?.question || "");

  // Handle change in question type
  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
  };

  // Handle change in question text
  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  // Handle save button click
  const handleSaveClick = () => {
    // Create a new question object with the updated type and text

    const updatedQuestion: QuestionTemplate = {
      id: editedQuestion?.id || uniqueId, // Generate a unique id for the question
      type: questionType,
      question: questionText,
      choices: [],
      maxChoice: 0,
      disqualify: false,
      other: false,
    };

    // Call the onSaveQuestion callback with the updated question
    onSaveQuestion(updatedQuestion);
  };

  return (
    <>
      <label>
        {editedQuestion && "this is an edit"}
        <h3>Type</h3>
        <Select
          defaultValue={questionType}
          style={{
            width: "100%",
            height: "68px",
            border: "1px solid black",
            borderRadius: "5px",
          }}
          onChange={handleQuestionTypeChange}
          options={typeOptions}
        />
      </label>
      <label>
        <h3>Question</h3>
        <Input
          style={{
            height: "68px",
            borderRadius: "5px",
            border: "1px solid #000",
            paddingInline: "24px",
          }}
          placeholder="Type here"
          value={questionText}
          onChange={handleQuestionTextChange}
        />
      </label>

      <div className="btn-container">
        <div onClick={() => onDeleteQuestion(editedQuestion)} className="delete-btn">
          <CloseIcon />
          Delete Question
        </div>
        <button onClick={handleSaveClick} className="save-btn">
          Save
        </button>
      </div>
    </>
  );
};

export default AddQuestion;

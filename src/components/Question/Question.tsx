import { useState } from "react";
import { Input, Select, Checkbox } from "antd";
import { QuestionsTypeOptions } from "./Items";
import CloseIcon from "../../assets/icons/CloseIcon";
import OrderedList from "../../assets/icons/OrderedList";
import PlusIcon from "../../assets/icons/PlusIcon";
import { QuestionTemplate } from "../../types/types";
import "./Question.css";

const Question = ({
  question,
  onQuestionChange,
  onDeleteQuestion,
  onSave,
}: {
  question: QuestionTemplate;
  onQuestionChange: (question: QuestionTemplate) => void;
  onDeleteQuestion: () => void;
  onSave?: () => void;
}) => {
  const typeOptions = QuestionsTypeOptions.map((questionType) => ({
    value: questionType,
    label: questionType,
  }));

  const [localQuestion, setLocalQuestion] = useState(question);

  const handleChange = (value: string) => {
    const updatedQuestion = {
      ...localQuestion,
      type: value,
      disqualify: value === "Yes/No" ? false : localQuestion.disqualify,
    };
    setLocalQuestion(updatedQuestion);
  };

  const handleCheckboxChange = (checked: boolean) => {
    const updatedQuestion = {
      ...localQuestion,
      disqualify: checked,
    };
    setLocalQuestion(updatedQuestion);
  };

  const handleOtherOptionChange = (checked: boolean) => {
    const updatedQuestion = {
      ...localQuestion,
      other: checked,
    };
    setLocalQuestion(updatedQuestion);
  };

  const handleSaveClick = () => {
    onQuestionChange(localQuestion);
    onSave!();
  };

  const handleDeleteClick = () => {
    onDeleteQuestion();
  };

  return (
    <>
      <label>
        <h3>Type</h3>
        <Select
          defaultValue={localQuestion.type}
          style={{
            width: "100%",
            height: "68px",
            border: "1px solid black",
            borderRadius: "5px",
          }}
          onChange={handleChange}
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
          value={null}
          onChange={null}
        />
      </label>
      {localQuestion.type === "Dropdown" && (
        // Conditionally render the choice section when the type is "Dropdown"
        <label>
          <h4>Choice</h4>
          <div className="choice-container">
            <OrderedList />
            <Input
              style={{
                height: "68px",
                borderRadius: "5px",
                border: "1px solid #000",
                paddingInline: "24px",
              }}
            ></Input>
            <PlusIcon />
          </div>
          <Checkbox
            style={{ paddingTop: "20px" }}
            checked={localQuestion.other}
            onChange={(e) => handleOtherOptionChange(e.target.checked)}
          >
            <span className="option">Enable "Other Option"</span>
          </Checkbox>
        </label>
      )}
      {localQuestion.type === "Yes/No" && (
        // Conditionally render the disqualify checkbox when the type is "Yes/No"
        <label style={{ marginLeft: "20px" }}>
          <Checkbox
            style={{ paddingTop: "20px" }}
            checked={localQuestion.disqualify}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
          >
            <span className="option">
              Disqualify Candidate if the answer is no
            </span>
          </Checkbox>
        </label>
      )}
      <div className="btn-container">
        <div onClick={handleDeleteClick} className="delete-btn">
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

export default Question;

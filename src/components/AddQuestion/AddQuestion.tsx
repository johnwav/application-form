import {
  Checkbox,
  Input,
  Select,
} from "antd";
import { QuestionsTypeOptions } from "./Items";
import CloseIcon from "../../assets/icons/CloseIcon";
import "./AddQuestion.css";
import { QuestionTemplate } from "../../types/types";
import { useState } from "react";
import generateUniqueId from "../../generateId";
import OrderedList from "../../assets/icons/OrderedList";
import PlusIcon from "../../assets/icons/PlusIcon";

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

  const [questionType, setQuestionType] = useState(editedQuestion?.type || "");
  const [questionText, setQuestionText] = useState(
    editedQuestion?.question || ""
  );
  const [disqualify, setDisqualify] = useState(
    editedQuestion?.disqualify || false
  );
  const [choices, setChoices] = useState<string[]>(
    editedQuestion?.choices || [""]
  );
  const [choiceText, setChoiceText] = useState<string>("");
  const [other, setOther] = useState(editedQuestion?.other || false);
  const [maxChoice, setMaxChoice] = useState(editedQuestion?.maxChoice || 0);

  // Handle save button click
  const handleSaveClick = () => {
    // Create a new question object with the updated type and text

    const updatedQuestion: QuestionTemplate = {
      id: editedQuestion?.id || uniqueId, // Generate a unique id for the question
      type: questionType,
      question: questionText,
      choices: choices,
      maxChoice: maxChoice,
      disqualify: disqualify,
      other: other,
    };

    // Call the onSaveQuestion callback with the updated question
    onSaveQuestion(updatedQuestion);
  };

  const handleAddChoice = () => {
    // Create a new choices array by copying the existing choices and adding the new choice
    setChoices([...choices, choiceText]);
    setChoiceText(""); // Clear the input field
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
          onChange={(value) => {
            setChoices(editedQuestion?.choices || [""]);
            setQuestionType(value);
          }}
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
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </label>

      {questionType === "Yes/No" && (
        // Conditionally render the disqualify checkbox when the type is "Yes/No"
        <label style={{ marginLeft: "20px" }}>
          <Checkbox
            style={{ paddingTop: "20px" }}
            checked={disqualify}
            onChange={(e) => setDisqualify(e.target.checked)}
          >
            <span className="option">
              Disqualify Candidate if the answer is no
            </span>
          </Checkbox>
        </label>
      )}

      {questionType === "Dropdown" && (
        // Conditionally render the choice section when the type is "Dropdown"
        <label>
          {choices.map((choice, index) => (
            <div key={index}>
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
                  placeholder="Type here"
                  value={choice}
                  onChange={(e) => {
                    const updatedChoices = [...choices];
                    updatedChoices[index] = e.target.value;
                    setChoices(updatedChoices);
                  }}
                ></Input>
                <div onClick={handleAddChoice}>
                  <PlusIcon />
                </div>
              </div>
            </div>
          ))}

          <Checkbox
            style={{ paddingTop: "20px" }}
            checked={other}
            onChange={(e) => setOther(e.target.checked)}
          >
            <span className="option">Enable "Other Option"</span>
          </Checkbox>
        </label>
      )}

      {questionType === "Multiple choice" && (
        // Conditionally render the choice section when the type is "Dropdown"
        <label>
          {choices.map((choice, index) => (
            <div key={index}>
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
                  placeholder="Type here"
                  value={choice}
                  onChange={(e) => {
                    const updatedChoices = [...choices];
                    updatedChoices[index] = e.target.value;
                    setChoices(updatedChoices);
                  }}
                ></Input>
                <div onClick={handleAddChoice}>
                  <PlusIcon />
                </div>
              </div>
            </div>
          ))}
          <Checkbox
            style={{ paddingTop: "20px" }}
            checked={other}
            onChange={(e) => setOther(e.target.checked)}
          >
            <span className="option">Enable "Other Option"</span>
          </Checkbox>
          <div className="max-choice">
            <h3>Max choice allowed</h3>
            <Input
              type="number"
              style={{
                height: "68px",
                borderRadius: "5px",
                border: "1px solid #000",
                paddingInline: "24px",
              }}
              placeholder="Enter number of choice allowed here"
              value={maxChoice}
              onChange={(e) => {
                const inputValue = parseInt(e.target.value, 10); // Parse the input value as an integer
                if (!isNaN(inputValue)) {
                  // Check if the parsed value is a valid number
                  setMaxChoice(inputValue);
                } else {
                  // Handle the case where the input is not a valid number
                  setMaxChoice(0); // You can set it to an empty string or some default value
                }
              }}
            ></Input>
          </div>
        </label>
      )}

      <div className="btn-container">
        <div
          onClick={() => onDeleteQuestion(editedQuestion)}
          className="delete-btn"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              height: "auto",
              paddingBlock: "26px",
              color: "var(--red)",
            }}
          >
            <CloseIcon /> <strong>Delete Question</strong>
          </div>
        </div>
        <button onClick={handleSaveClick} className="save-btn">
          Save
        </button>
      </div>
    </>
  );
};

export default AddQuestion;

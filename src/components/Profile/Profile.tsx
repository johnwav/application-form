import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import toTitleCase from "../../toTitleCase";
import { Checkbox, Switch } from "antd";
import { setProfileInformation as sendProfileInfo } from "../../data/dataSlice";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddQuestion from "../AddQuestion/AddQuestion";
import Question from "../Question/Question";
import { QuestionTemplate } from "../../types/types";

const Profile = () => {
  const dispatch = useDispatch();
  const profileInfo = useSelector(
    (state: RootState) => state.data.data.attributes.profile
  );
  const [profileInformation, setProfileInformation] = useState(profileInfo);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<QuestionTemplate | null>(
    null
  );

  const info = ["education", "experience", "resume"];
  const profileQuestions = useSelector(
    (state: RootState) => state.data.data.attributes.profile.profileQuestions
  );

  const handleCheckboxChange = (attributeName, updatedData) => {
    setProfileInformation((prev) => ({
      ...prev,
      [attributeName]: {
        ...prev[attributeName],
        mandatory: updatedData,
      },
    }));
  };

  const handleSwitchChange = (attributeName, updatedData) => {
    setProfileInformation((prev) => ({
      ...prev,
      [attributeName]: {
        ...prev[attributeName],
        show: updatedData,
      },
    }));
  };

  // Function to handle saving a new profile question
  const handleSaveQuestion = (newQuestion: QuestionTemplate) => {
    setProfileInformation((prev) => ({
      ...prev,
      profileQuestions: [...prev.profileQuestions, newQuestion],
    }));

    // Set the editedQuestion state and close the AddQuestion component
    setEditedQuestion(newQuestion);
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (questionToDelete: QuestionTemplate) => {
    setShowAddQuestion(false); // Close the AddQuestion component

    // Check if the question being deleted is the edited question
    if (editedQuestion && editedQuestion.id === questionToDelete.id) {
      setEditedQuestion(null); // Clear the edited question state
    }
    // Remove the question from the profileQuestions array

    setProfileInformation((prev) => ({
      ...prev,
      profileQuestions: prev.profileQuestions.filter(
        (q) => q.id !== questionToDelete.id
      ),
    }));
    // Dispatch the updated profileQuestions to Redux
    // dispatch(setProfileQuestions(updatedProfileQuestions));

    questionToDelete && console.log(questionToDelete, "deleted");
  };

  // Function to handle updating a profile question
  const handleUpdateQuestion = (updatedQuestion: QuestionTemplate) => {
    console.log("ne ques", updatedQuestion);
    // Find the index of the question to be updated

    const updatedProfileInfo = { ...profileInformation };

    const questionIndex = updatedProfileInfo.profileQuestions.findIndex(
      (q) => q.id === updatedQuestion.id
    );

    if (questionIndex !== -1) {
      // Create a copy of the profileQuestions array
      const updatedProfileQuestions = [...updatedProfileInfo.profileQuestions];

      // Update the question at the specified index with the new question
      updatedProfileQuestions[questionIndex] = updatedQuestion;

      updatedProfileInfo.profileQuestions = updatedProfileQuestions;
      setProfileInformation(updatedProfileInfo);
    }
  };

  useEffect(() => {
    // Dispatch updated profileInformation to Redux
    dispatch(sendProfileInfo(profileInformation));
    console.log("dispatching", profileInformation);
  }, [profileInformation]);

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {info.map((item, index) => (
        <label
          key={index}
          style={{
            borderBottom:
              index === info.length - 1 ? "none" : "1px solid var(--grey)",
            paddingBottom: "20px",
          }}
          className="container"
        >
          <div className="left">
            <h3>{toTitleCase(item)}</h3>
          </div>
          <div className="right">
            <Checkbox
              checked={profileInformation[item].mandatory}
              onChange={(e) => handleCheckboxChange(item, e.target.checked)}
            >
              Internal
            </Checkbox>
            <div style={{ display: "flex", gap: "10px" }}>
              <Switch
                defaultChecked={profileInformation[item].show}
                onChange={(checked) => handleSwitchChange(item, checked)}
              />
              {profileInformation[item].show ? "Show" : "Hide"}
            </div>
          </div>
        </label>
      ))}

      {/* Map and display existing profile questions */}
      {profileQuestions.map((question, index) => (
        <div
          key={index}
          style={{
            borderBottom:
              index === profileQuestions.length - 1
                ? "none"
                : "1px solid var(--grey)",
            paddingBottom: "20px",
            borderTop: index === 0 ? "1px solid var(--grey)" : "none",
          }}
        >
          <Question
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteQuestion}
            onEditQuestion={(newQuestion) => handleUpdateQuestion(newQuestion)}
          />
        </div>
      ))}

      {showAddQuestion && (
        <AddQuestion
          onSaveQuestion={handleSaveQuestion}
          editedQuestion={editedQuestion}
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
  );
};

export default Profile;

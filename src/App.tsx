import { useSelector } from "react-redux";
import "./App.css";
import Box from "./components/Box/Box";
import CustomQuestions from "./components/CustomQuestions/CustomQuestions";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Profile from "./components/Profile/Profile";
import UploadArea from "./components/UploadArea/UploadArea";
import { updateData } from "./services/apiService";
import { RootState } from "./store/store";

function App() {
  const Form = useSelector((state: RootState) => state.data);
  const programId = "enterId"

  const put = async () => {
    const payload = Form; // Check the payload before sending
    console.log("Payload:", payload);
    if (Form.data.attributes.coverImage === "") {
      alert("Please upload an image");
      return;
    }
    await updateData(payload, programId);
    alert('Form Created')
  };

  return (
    <div className="app">
      <UploadArea />
      <Box title={"Personal Information"}>
        <PersonalInfo />
      </Box>
      <Box title={"Profile"}>
        <Profile />
      </Box>
      <Box title={"Addtional Questions"}>
        <CustomQuestions />
      </Box>

      <button className="create-form" onClick={put}>
        <h3>Create Form</h3>
      </button>
    </div>
  );
}

export default App;

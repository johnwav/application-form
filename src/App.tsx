import "./App.css";
import Box from "./components/Box/Box";
import CustomQuestions from "./components/CustomQuestions/CustomQuestions";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Profile from "./components/Profile/Profile";
import UploadArea from "./components/UploadArea/UploadArea";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;

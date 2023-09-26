import "./App.css";
import Box from "./components/Box/Box";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import UploadArea from "./components/UploadArea/UploadArea";

function App() {
  return (
    <>
      <Box title={"Upload cover image"}>
        <div
          style={{
            paddingInline: "40px",
            paddingTop: "60px",
            paddingBottom: "56px",
          }}
        >
          <UploadArea />
        </div>
      </Box>
      <Box title={"Personal Information"}>
        <PersonalInfo />
      </Box>
    </>
  );
}

export default App;

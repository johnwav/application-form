import "./App.css";
import Box from "./components/Box/Box";
import UploadArea from "./components/UploadArea/UploadArea";
// import PersonalInformation from "./components/PersonalInformation/PersonalInformation";


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
        {/* <PersonalInformation /> */}
      </Box>
    </>
  );
}

export default App;

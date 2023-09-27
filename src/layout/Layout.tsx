import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div style={{ marginLeft: "118px", marginTop: "122px" }}>
        <Navbar />
      </div>
      <br />
      <br />
      <main style={{ marginLeft: "118px" }}>
        <div style={{ paddingInlineStart: "70px" }}>
          {children}
        </div>
      </main>
      <Sidebar />
    </div>
  );
};

export default Layout;

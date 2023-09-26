import "./Navbar.css";
const Navbar = () => {
  const activeTab = "Application Form";
  // Setting the active tab to Application form
  // This should be gotten from the route

  const tabs = ["Program Details", "Application Form", "Workflow", "Preview"];

  return (
    <div className="navbar">
      {tabs.map((tab, index) => (
        <div key={index} className={`navbar-item ${activeTab === tab ? 'active' : ''}`}>
          <div className="navbar-tab">
            {tab}
            {activeTab === tab && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="42"
                viewBox="0 0 21 42"
                fill="none"
                className="indicator"
              >
                <path d="M21 21L0 42L-2.09101e-06 0L21 21Z" fill="#00635B" />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Navbar;

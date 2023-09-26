import "./Box.css";

const Box = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: String;
}) => {
  return (
    <div className="box">
      <div className="title">
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Box;

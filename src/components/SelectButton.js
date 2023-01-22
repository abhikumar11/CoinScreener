
const SelectButton = ({ children, selected, onClick }) => {
  
  return (
    <span onClick={onClick} style={{
      backgroundColor: selected ? "green" : "",color: selected ? "white" : "",
    fontWeight: selected ? 200 : 500,
    border: "1px solid green",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: "Montserrat",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "green",
      color: "black",
    },
    width: "20%",
    }}>
      {children}
    </span>
  );
};

export default SelectButton;
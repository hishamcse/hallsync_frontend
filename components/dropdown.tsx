import { CSSProperties } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function MyDropDown(props : {
  items : string[],
  selectedVal : string,
  onSelect : (val : string)=>void,
  toggleStyle? : CSSProperties,
  
}) {
  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle variant="success" id="dropdown-basic" value={"asdf"}
      style = {{
        backgroundColor : "#111111",
        borderColor : "white",
        display : "flex",
        justifyContent : 'space-between',
        alignItems : 'center',
        ...props.toggleStyle
      }}
      >
        {props.selectedVal}
      </Dropdown.Toggle>
      

      <Dropdown.Menu>
        {
          props.items.map(v =>(
            <div key={v}>
            <Dropdown.Item onClick={()=>props.onSelect(v)}>{v}</Dropdown.Item>
            </div>
          ))
        }
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MyDropDown;
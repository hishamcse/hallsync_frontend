import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function MyCheckBox() {
  return (
      <InputGroup className="mb-3"  data-bs-theme="dark">
        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
      </InputGroup>      
  );
}

export default MyCheckBox;
import { useState } from "react";

const FormComponent = ({ onCreateUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    }
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }
  
    const handleCreateClick = () => {
      const newUser = {
        name,
        email
      };
      onCreateUser(newUser);
    }
  
    return (
      <div>
        <input type="text" value={name} onChange={handleNameChange} />
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={handleCreateClick}>Create</button>
      </div>
    );
}
export default FormComponent
  
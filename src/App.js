import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [inputfields, setInputFields] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [formerrors, setErrors] = useState([]);
  const [isflag, setIsFlag] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...inputfields, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(inputfields));
    setIsFlag(true);
  };

  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && isflag) {
      console.log("InputFields");
    }
  }, [formerrors]);

  const validation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name Required";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is Invalid";
    }

    if (!values.password) {
      errors.password = "Password Required";
    } else if (values.password.length < 7) {
      errors.password =
        "Password must be More than 7 characters nd speacial characters";
    }

    if (!values.phone) {
      errors.phone = "Phone Number is Reuqired";
    } else if (values.phone.length < 9) {
      errors.phone = "Phone Number must contains 10 digits";
    }
    return errors;
  };
  return (
    <div className="App">
      <h1>Sign UP Form</h1>
      <form onSubmit={handleSubmit}>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          value={inputfields.name}
          onChange={handleChange}
        />
        {formerrors.name}
        <br></br>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          value={inputfields.email}
          onChange={handleChange}
        />
        {formerrors.email}
        <br></br>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          value={inputfields.password}
          onChange={handleChange}
        />
        {formerrors.password}
        <br></br>
        <label for="number">Phone Number</label>
        <input
          type="number"
          name="phone"
          value={inputfields.phone}
          onChange={handleChange}
        />
        {formerrors.phone}
        <br></br>
        <br></br>
        <button type="submit"> Sign Up</button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Form, FormGroup, Label, Input, FormFeedback, Button } from "reactstrap";
import * as yup from "yup";
import axios from "axios";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  const schema = yup.object().shape({
    name: yup.string().min(5, "Name must be at least 5 characters").required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    terms: yup.boolean().oneOf([true], "Terms of use must be accepted"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    schema
      .validate({ name, email, password, terms })
      .then(() => {
        axios
          .post("https://reqres.in/api/users", { name, email, password, terms })
          .then((response) => {
            console.log(response.data);
            setName("");
            setEmail("");
            setPassword("");
            setTerms(false);
            setError("");
          })
          .catch((error) => {
            console.log(error.response.data);
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">İsim:</Label>
        <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} invalid={error && error.includes("Name")} />
        {error && error.includes("Name") && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="email">E-posta:</Label>
        <Input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} invalid={error && error.includes("Email")} />
        {error && error.includes("Email") && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="password">Şifre:</Label>
        <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} invalid={error && error.includes("Password")} />
        {error && error.includes("Password") && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" name="terms" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} invalid={error && error.includes("Terms")} />{" "}
          Kullanım Şartları
        </Label>
        {error && error.includes("Terms") && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
      <Button color="primary" type="submit">
        Gönder
      </Button>
    </Form>
  );
}

export default SignupForm;

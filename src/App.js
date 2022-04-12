import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './App.css';
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { Button } from "react-bootstrap";
import { useState } from "react";


const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePassword = event => {
    setPassword(event.target.value)
  }

  const handleRegisteredChanged = (event) => {
    setRegistered(event.target.checked);
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!/[#?!@$%^&*\-_\\/]/.test(password)) {
      setError('Please contain at least one special character');
      return;
    }

    setValidated(true);
    setError('');

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          setError(error.message)
        })

    }
    else {

      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          console.log('error', error)
          setError(error.message)
        })

    }




  }
  return (
    <div className="w-50 mx-auto">
      <h2 className="text-primary" >Please {registered ? 'Login' : 'Register'}!</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmitForm} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />

          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group onBlur={handlePassword} className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handleRegisteredChanged} type="checkbox" label="Already have an account?" />
        </Form.Group>
        <p className="text-danger" >{error}</p>
        <Button variant="primary" type="submit">
          {registered ? 'Login' : 'Register'}
        </Button>
      </Form>
    </div>
  );
}

export default App;

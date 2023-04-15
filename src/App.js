import React from 'react';
import firebase from './firebase';
import ChatBot from 'react-simple-chatbot';

class App extends React.Component {
  state = {
    mobile: '',
    otp: '',
    showChatBot: false
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log('Recaptcha verified');
      },
      defaultCountry: 'IN'
    });
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = '+91' + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log('OTP has been sent');
        this.setState({ showChatBot: true });
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log('SMS not sent');
      });
  };

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert('User is verified');
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  render() {
    const { showChatBot } = this.state;
    return (
      <div>
        <h2>Login Form</h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input
            type="number"
            name="mobile"
            placeholder="Mobile number"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>

        {showChatBot && (
          <div>
            <h2>Enter OTP</h2>
            <form onSubmit={this.onSubmitOTP}>
              <input
                type="number"
                name="otp"
                placeholder="OTP Number"
                required
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </form>

            <h2>ChatBot</h2>
            <div className="container">
              <ChatBot steps={this.steps} />
            </div>
          </div>
        )}
      </div>
    );
  }

  steps =  [
    {
      id: "greet",
      message: "Hello, welcome to the Python Basics ChatBot",
      trigger: "name",
    },
    {
      id: "name",
      message: "Please enter your name",
      trigger: "wait1",
    },
    {
      id: "wait1",
      user: true,
      trigger: "name1",
    },
    {
      id: "name1",
      message: "Hi {previousValue}, what would you like to know about Python basics? Choose a topic:",
      trigger: "topic",
    },
    {
      id: "topic",
      options: [
        {
          value: "variables",
          label: "Variables",
          trigger: "variables",
        },
        {
          value: "dataTypes",
          label: "Data Types",
          trigger: "dataTypes",
        },
        {
          value: "loops",
          label: "Loops",
          trigger: "loops",
        },
        // Add more questions/topics related to Python basics here
      ],
    },
    {
      id: "variables",
      message: "Variables in Python are used to store data. What would you like to know about variables?",
      trigger: "topic",
    },
    {
      id: "dataTypes",
      message: "Data types in Python define the type of data that can be stored. What would you like to know about data types?",
      trigger: "topic",
    },
    {
      id: "loops",
      message: "Loops in Python are used to perform repetitive tasks. What would you like to know about loops?",
      trigger: "topic",
    },
    // Add more steps to provide information about other Python basic topics
  ];
}
   
export default App;
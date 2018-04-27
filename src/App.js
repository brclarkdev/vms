import React, { Component } from 'react';
import { render } from "react-dom";
import logo from './logo.svg';
import './App.css';
import Wizard from "./Wizard";
import { FieldControl, Validators } from "react-reactive-form";
import styles from "./styles";

const handleSubmit = control => {
  alert(`You submitted \n ${JSON.stringify(control.value, null, 2)}`);
};
const Error = ({ msg }) => (
  <div>
    <span style={styles.error}>{msg}</span>
  </div>
);

const WizardForm = () => (
  <div style={styles.main}>
    <h2>Form Wizard - Multi Step Form</h2>
    <a
      className="github-button"
      href="https://github.com/bietkul/react-reactive-form"
      data-icon="octicon-star"
      aria-label="Star ntkme/github-buttons on GitHub"
      target="_blank"
    >
      Check out the repo
    </a>
    <Wizard onSubmit={handleSubmit}>
      <Wizard.Step>
        <h2 style={{ color: "#808080" }}>Step 1</h2>
        <FieldControl
          strict={false}
          name="first_name"
          options={{
            validators: Validators.required
          }}
          render={({ handler, hasError, submitted }) => (
            <div>
              <label>First Name:</label>
              <input style={styles.input} {...handler()} />
              {submitted &&
                hasError("required") && <Error msg="First Name is required" />}
            </div>
          )}
        />
        <FieldControl
          strict={false}
          name="last_name"
          options={{
            validators: Validators.required
          }}
          render={({ handler, hasError, submitted }) => (
            <div>
              <label>Last Name:</label>
              <input style={styles.input} {...handler()} />
              {submitted &&
                hasError("required") && <Error msg="Last Name is required" />}
            </div>
          )}
        />
      </Wizard.Step>
      <Wizard.Step>
        <h2 style={{ color: "#808080" }}>Step 2</h2>
        <FieldControl
          strict={false}
          name="mail"
          options={{
            validators: [Validators.email, Validators.required]
          }}
          render={({ submitted, handler, hasError }) => {
            return (
              <div>
                <label>Email:</label>
                <input style={styles.input} {...handler()} />
                {submitted &&
                  (hasError("required") && <Error msg="Email is required" />)}
                {submitted &&
                  (hasError("email") && <Error msg="Invalid email" />)}
              </div>
            );
          }}
        />
        <FieldControl
          strict={false}
          name="age"
          render={({ handler }) => (
            <div>
              <label>Age:</label>
              <input type="number" style={styles.input} {...handler()} />
            </div>
          )}
        />
      </Wizard.Step>
      <Wizard.Step>
        <h2 style={{ color: "#808080" }}>Step 3</h2>
        <FieldControl
          strict={false}
          name="city"
          render={({ handler }) => (
            <div>
              <label>City:</label>
              <input style={styles.input} {...handler()} />
            </div>
          )}
        />
        <FieldControl
          strict={false}
          name="country"
          render={({ handler }) => (
            <div>
              <label>Country:</label>
              <input style={styles.input} {...handler()} />
            </div>
          )}
        />
      </Wizard.Step>
      <Wizard.Step>
        <h2 style={{ color: "#808080" }}>Step 4</h2>
        <FieldControl
          strict={false}
          name="notes"
          render={({ handler }) => (
            <div style={styles.genderContainer}>
              <div style={styles.genderText}>
                <label>Notes:</label>
              </div>
              <div style={styles.textAreaContainer}>
                <textarea style={styles.textAreaStyles} {...handler()} />
              </div>
            </div>
          )}
        />
        <FieldControl
          strict={false}
          name="terms"
          formState={false}
          options={{ validators: Validators.requiredTrue }}
          render={({ handler, hasError, submitted }) => (
            <div>
              <input {...handler("checkbox")} />
              <label>&nbsp;&nbsp;I agree to the terms and condition.</label>

              {submitted &&
                (hasError("required") && (
                  <Error msg="Please do agree to terms." />
                ))}
            </div>
          )}
        />
      </Wizard.Step>
    </Wizard>
  </div>
);

render(<WizardForm />, document.getElementById("root"));

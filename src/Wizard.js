import React from "react";
import { FieldGroup, FieldControl } from "react-reactive-form";
import Values from "./Values";

export default class Wizard extends React.Component {
  static Step = ({ children }) => children;
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }
  goToNext = () => {
    this.setState(prevState => ({
      step: Math.min(prevState.step + 1, this.props.children.length - 1)
    }));
  };
  goToPrev = () => {
    this.setState(prevState => ({ step: Math.max(prevState.step - 1, 0) }));
  };

  handleSubmit(e, control) {
    const { children, onSubmit } = this.props;
    const { step } = this.state;
    const isLastPage = step === React.Children.count(children) - 1;
    const activePage = React.Children.toArray(children)[step];
    e.preventDefault();
    control.handleSubmit();
    if (isLastPage && control.valid) {
      onSubmit(control);
    } else {
      const isActivePageValid = !activePage.props.children.some(
        o =>
          o.type === FieldControl &&
          o.props.name &&
          control.get(o.props.name) &&
          control.get(o.props.name).invalid
      );
      if (isActivePageValid) {
        this.goToNext();
      }
    }
  }
  render() {
    const { children } = this.props;
    const { step } = this.state;
    const activePage = React.Children.toArray(children)[step];
    const isLastPage = step === React.Children.count(children) - 1;
    return (
      <div>
        <FieldGroup
          strict={false}
          options={{ updateOn: "submit" }}
          render={control => (
            <form onSubmit={e => this.handleSubmit(e, control)}>
              {activePage.props.children}
              {step > 0 && (
                <button type="button" onClick={this.goToPrev}>
                  Previous
                </button>
              )}
              {isLastPage && <button type="submit">Submit</button>}
              {!isLastPage && <button type="submit">Next</button>}
              <Values value={control.value} />
            </form>
          )}
        />
      </div>
    );
  }
}

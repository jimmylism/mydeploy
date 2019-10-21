import React from "react";
import Axios from "axios";
// material-ui components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter";
import TypeSelect from "views/Modals/TypeSelect.js";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import ReCAPTCHA from "react-google-recaptcha";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userType: "",
      successful: "",
      cardAnimaton: "cardHidden"
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleUserTypeChange = event => {
    this.setState({ userType: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(user);
    
    Axios.post("https://infinity-care.herokuapp.com/login/patient", { user })
      .then(res=> {
        if(res.isOtpSent===true && res.isCredentialsAccurate) {
          this.setState({successful: true})
        }
      })
  };

  responseFacebook(response) {
    console.log(response);
  }

  onChange(value) {
    console.log("Captcha value:", value);
  }

  render() {
    return (
        <form>
        <CardHeader color="primary">
          <h4>Log in with</h4>
          <div>
            <FacebookLogin
              appId="523513645103749"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}
              render={renderProps => ( 
                <Button
                  justIcon
                  target="_blank"
                  color="transparent"
                  onClick={renderProps.onClick}
                >
                  <i className={"fab fa-facebook"} />
                </Button>
              )}
            />
          </div>
        </CardHeader>
        <CardBody>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{display: 'flex', justifyContent: 'center', margin: 0}}>Don't have an account?</p>
            <TypeSelect />
          </div>
          <CustomInput
            labelText="Username..."
            id="first"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
              onChange: this.handleUsernameChange,
              endAdornment: (
                <InputAdornment position="end">
                  <People />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              endAdornment: (
                <InputAdornment position="end">
                  <Icon>
                    lock_outline
                  </Icon>
                </InputAdornment>
              ),
              autoComplete: "off"
            }}
          />
          <CustomInput
            labelText="userType"
            id="usertype"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "usertype",
              onChange: this.handleUserTypeChange,
              autoComplete: "off"
            }}
          />
          <div style={{display: 'flex', alignSelf: 'right'}}>
            <Button color="primary" simple>
              Forgot password?
            </Button>
          </div>
          <small style={{display: 'flex', justifyContent: 'center'}}>I agree to the Terms and Conditions &amp; Privacy Policy</small>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={this.onChange}
          />
        </CardBody>
        <CardFooter style={{display: 'flex', justifyContent: 'center', margin: 0}}>
          <Button 
          onClick={this.handleSubmit}
          style={{ minWidth: "70%" }}
          color="info">
            Sign In
          </Button>
          {this.successful}
        </CardFooter>
      </form>
    );
  }
}

/*
profile edit form

Properties:
    props.displayName - the current displayName of the author
    props.onCancel - cancel button's onClick event handler
*/


import React from "react";
import Dividor from "./Dividor";
import { Button, Form, Container } from "react-bulma-components";
import { YonderLogo } from "./ProfileViewSVG";
import { style, color } from "./styling";

// local styling
var buttonStyleGeneric = style.button.style.generic;
var buttonsLayout = style.button.layout.horizontalBetween;

var formStyle = {
    overall: {
        paddingLeft: "1em",
        paddingRight: "1em",
        paddingTop: "0.5em",
        paddingBottom: "1.75em",
    },
    label: Object.assign(
        {}, style.text.body,        // overwrite the font styling set by bulma
        {
            paddingTop: "0.5em",
            textAlign: "left",
            fontWeight: "400",
        } 
    )
}

var headingStyle = {
    overall: {
        paddingTop: "1.5em",
        paddingBottom: "2em",
    },
    title: style.text.heading,
    logo: {
        scale: "90",
        style: {
            padding: "1.1em",
            fill: color.baseBlack,
        }
    }
}

class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);

        // states
        this.state = {
            displayName: '',
            password: '',
            githubURL: '',
        }
    }

    onChange = (evt) => {
        // https://couds.github.io/react-bulma-components/?path=/story/form--handle-multiple-inputs
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
            [evt.target.name]: value,
        });
    }
    
    render() {
        const { displayName, password, githubURL } = this.state;
        return (
            <Container>
                <Container style={headingStyle.overall}>
                    <div style={headingStyle.logo.style}><YonderLogo svgScale={headingStyle.logo.scale}/></div>
                    <Container style={headingStyle.title}>
                        <p>Edit your profile</p>
                    </Container>
                </Container>
                <Dividor/>
                <Container style={formStyle.overall}>
                    <Form.Field>
                        <Form.Label style={formStyle.label}>Display Name</Form.Label>
                        <Form.Control>
                            <Form.Input 
                                name="displayName" 
                                onChange={this.onChange} 
                                value={displayName} 
                                type="text" 
                                placeholder={this.props.displayName}
                            ></Form.Input>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label style={formStyle.label}>Password</Form.Label>
                        <Form.Control>
                            <Form.Input 
                                name="password" 
                                onChange={this.onChange} 
                                value={password} type="password" 
                                placeholder="Enter your new password"
                            ></Form.Input>
                        </Form.Control>
                    </Form.Field>
                </Container>
                <Dividor/>
                <Container style={formStyle.overall}>
                    <Form.Field>
                        <Form.Label style={formStyle.label}>Github URL</Form.Label>
                        <Form.Control>
                            <Form.Input 
                                name="githubURL" 
                                onChange={this.onChange} 
                                value={githubURL} 
                                type="url" 
                                placeholder="Enter your github URL"
                            ></Form.Input>
                        </Form.Control>
                    </Form.Field>
                </Container>
                <Dividor/>
                <Container style={buttonsLayout}>
                    <Button onClick={this.props.onCancel} style={buttonStyleGeneric}>Cancel</Button>
                    <Button style={buttonStyleGeneric}>Confirm</Button>
                </Container>
            </Container>
        );
    }
}

export default ProfileEdit;
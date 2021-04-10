// logout if login
// login if logout

import { Container, Button } from "react-bulma-components";
import { color } from "../styling/ColorFontConfig";

// local styling
var buttonStyle = {
    scale: "25",
    text: {
        color: color.textLightGreyOnCream,
        fontSize: "1.3em",
    },
    style: {
        loginButton: {
            height: "3.5em",
            width: "3.5em",
            borderRadius: "100%",
            backgroundColor: color.buttonGreen,
            border: "none",
        },
        logoutButton: {
            height: "3.5em",
            width: "3.5em",
            borderRadius: "100%",
            backgroundColor: color.buttonRed,
            border: "none",
        },
        loginIcon: {
            paddingTop: "2pt",
            paddingLeft: "3pt",
            fill: "rgb(255,255,255,0.9)",
        },
        logoutIcon: {
            paddingTop: "4pt",
            paddingLeft: "4pt",
            fill: "rgb(255,255,255,0.9)",
        }
    }
}



// component
function loginButton(props) {

    const LoginIcon = () =>{
        return (
            <Container style={buttonStyle.style.loginIcon}>
            <svg id="user" xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} viewBox="0 0 218.566 191.246">
            <path id="Path_172" data-name="Path 172" d="M176.4,45.535A45.535,45.535,0,1,1,130.867,0,45.534,45.534,0,0,1,176.4,45.535Zm0,0" transform="translate(-48.905)"/>
            <path id="Path_173" data-name="Path 173" d="M120.668,256H43.257A43.308,43.308,0,0,0,0,299.257v31.875a6.833,6.833,0,0,0,6.83,6.83H157.095a6.833,6.833,0,0,0,6.83-6.83V299.257A43.308,43.308,0,0,0,120.668,256Zm0,0" transform="translate(0 -146.717)"/>
            <path id="Path_174" data-name="Path 174" d="M387.56,138.1l-31.875-29.6A6.845,6.845,0,0,0,344.2,113.51V134H307.774a9.106,9.106,0,0,0,0,18.213H344.2V172.7a6.838,6.838,0,0,0,11.484,5.009l31.875-29.6a6.853,6.853,0,0,0,0-10.019Zm0,0" transform="translate(-171.17 -61.144)"/>
            </svg>
            </Container>
        )
    }

    const LogoutIcon = () =>{
        return (
            <Container style={buttonStyle.style.logoutIcon}>
            <svg id="log-out" xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} viewBox="0 0 215.017 215.015">
            <path id="Path_170" data-name="Path 170" d="M134.384,116.466a8.956,8.956,0,0,0-8.959,8.959v35.836a8.968,8.968,0,0,1-8.959,8.959H89.589V35.836A18.057,18.057,0,0,0,77.387,18.8l-2.652-.887h41.731a8.968,8.968,0,0,1,8.959,8.959V53.754a8.959,8.959,0,1,0,17.918,0V26.877A26.91,26.91,0,0,0,116.466,0H20.158A7,7,0,0,0,19.2.2c-.43-.036-.842-.2-1.281-.2A17.936,17.936,0,0,0,0,17.918V179.179A18.057,18.057,0,0,0,12.2,196.21l53.915,17.972a18.551,18.551,0,0,0,5.555.833A17.936,17.936,0,0,0,89.589,197.1v-8.959h26.877a26.91,26.91,0,0,0,26.877-26.877V125.425a8.956,8.956,0,0,0-8.959-8.959Z" transform="translate(0)"/>
            <path id="Path_171" data-name="Path 171" d="M108.923,43.462,73.088,7.626A8.957,8.957,0,0,0,57.795,13.96V40.837H21.959a8.959,8.959,0,1,0,0,17.918H57.795V85.632a8.957,8.957,0,0,0,15.293,6.334L108.923,56.13a8.949,8.949,0,0,0,0-12.668Z" transform="translate(103.466 39.793)"/>
            </svg>
            </Container>
        )
    }

    return (
        <Container style={props.style}>
            <Button style={props.islogin? buttonStyle.style.logoutButton : buttonStyle.style.loginButton} onClick={props.action}>
                {props.islogin? <LogoutIcon/> : <LoginIcon/>}
            </Button>
            <p style={buttonStyle.text}>{props.islogin? "Logout" : "Login"}</p>
        </Container>
    );
}

export default loginButton;
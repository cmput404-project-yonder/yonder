import React from "react";
import { connect } from "react-redux";
import { logout } from "./login/LoginActions.js";

class NaviPollingErrorHandlerComponent extends React.Component {
    // handles error in state.navigation

    componentDidUpdate = () => {
      switch (this.props.errorResponse.status) {
        case 401:
            this.props.logout();
            break;
        default:
            break;
      }
    }
  
    render() {
      return <span></span>;
    }
}

const mapStateToProps = (state) => ({
    errorResponse: state.navigation.error,
});

export default connect(mapStateToProps, { logout })(NaviPollingErrorHandlerComponent);
import React from "react";
import { connect } from "react-redux";
import { unsetCurrentUser } from "./login/LoginActions.js";

class NaviPollingErrorHandlerComponent extends React.Component {
    // handles error in state.navigation

    componentDidUpdate = () => {
      switch (this.props.errorResponse.status) {
        case 401:
            unsetCurrentUser();
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

export default connect(mapStateToProps, { unsetCurrentUser })(NaviPollingErrorHandlerComponent);
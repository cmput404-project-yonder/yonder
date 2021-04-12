import React from "react";
import { connect } from "react-redux";

class NaviPollingErrorHandlerComponent extends React.Component {
    // handles error in state.navigation

    componentDidUpdate = () => {
      switch (this.props.errorResponse.status) {
        case 401:
            window.location.pathname = "/";
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

export default connect(mapStateToProps)(NaviPollingErrorHandlerComponent);
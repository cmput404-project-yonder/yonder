import React from "react";
import { cardStyle } from "../../styling/StyleComponents";
import { Card } from "react-bulma-components";
import SearchBar from "./SearchBar";
import { withRouter } from "react-router-dom";
import {sendFollow} from "../profile/ProfileActions";
import { connect } from "react-redux";

class SearchModalView extends React.Component {
    render() {
        return (
            <Card style={{...cardStyle, height:"30em"}} >
                <SearchBar authors={this.props.allAuthors} follow={this.props.sendFollow}/>
            </Card>
        )
    }
}


const mapStateToProps = (state) => ({
  allAuthors: state.stream.allAuthors,
});

export default connect(mapStateToProps, { sendFollow })(withRouter(SearchModalView));
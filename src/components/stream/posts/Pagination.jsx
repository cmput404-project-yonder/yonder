import React from 'react';
import { Modal, Button, Content, Section, Card,Container,Columns, List } from "react-bulma-components";
import { color } from '../../../styling/ColorFontConfig';



var pagiButtonStyle = {
    selected: {
        cursor: "pointer",
        borderRadius: "7pt",
        borderWidth: "1.5pt",
        border: "solid",
        borderColor: color.baseRed,
        color: color.baseRed,
        backgroundColor: "transparent",
        fontSize: "1.3em",
        fontWeight: "500",    
    },
    unselected: {
        cursor: "pointer",
        borderRadius: "7pt",
        borderWidth: "1.5pt",
        border: "none",
        borderColor: color.baseRed,
        color: color.baseLightGrey,
        backgroundColor: "transparent",
        fontSize: "1.3em",
        fontWeight: "500",  
        marginLeft: "0",
        marginRight: "0",
    }

}

var pagiStyle = {
    display: "flex",
    gap: "0.4em",
    margin: "auto", 
    paddingBottom: "1em", 
    marginTop: "-0.5em",
}


function PagiButton (props) {
    return (
        <button type="button" style={(props.selected)?pagiButtonStyle.selected:pagiButtonStyle.unselected} onClick={props.onClick}>
            {props.page}
        </button>
    )
}

function PagiHellip (props) {
    return (
        <p style={{fontSize: "1.3em", marginTop: "3pt",color: color.baseLightGrey}}>
            &hellip;
        </p>
    )
}


function PaginationTag(props) {
      
    let totalPageNum = Math.ceil(props.count / props.pageSize);
    let currentPageNum = props.pageNum;

    console.log(totalPageNum);
    console.log(props.count);

    return (
        <Container style={pagiStyle}>
            <PagiButton selected={false} page={"1"}/>
            <PagiHellip/>
            <PagiButton selected={false} page={"31"}/>
            <PagiButton selected={true} page={"32"}/>
            <PagiButton selected={false} page={"33"}/>
            <PagiHellip/>
            <PagiButton selected={false} page={"79"}/>
            
        </Container>
    )
}

  export default PaginationTag;
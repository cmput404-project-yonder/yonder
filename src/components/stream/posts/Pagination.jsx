import React from 'react';
import { Modal, Button, Content, Section, Card,Container,Columns, List } from "react-bulma-components";
import { color } from '../../../styling/ColorFontConfig';

var pagiStyle = {
    display: "flex",
    gap: "0.4em",
    justifyContent: "center",
    margin: "auto", 
    paddingBottom: "1em", 
    marginTop: "-0.5em",
}

function PaginationTag(props) {

    var pagiButtonStyle = {
        selected: {
            cursor: "pointer",
            borderRadius: "7pt",
            borderWidth: "1.5pt",
            border: "solid",
            borderColor: props.primaryColor,
            color: props.primaryColor,
            backgroundColor: "transparent",
            fontSize: "1.3em",
            fontWeight: "500",  
            marginLeft: "0.1em",
            marginRight: "0.1em",  
        },
        unselected: {
            cursor: "pointer",
            borderRadius: "7pt",
            borderWidth: "1.5pt",
            border: "solid",
            borderColor: "transparent",
            color: props.secondaryColor,
            backgroundColor: "transparent",
            fontSize: "1.3em",
            fontWeight: "500",  
            marginLeft: "0.1em",
            marginRight: "0.1em",
        }
    }

    var totalPageNum = Math.ceil(props.count / props.pageSize);

    const pagiButton = (page) => {
        // only returns if page <= total page
        if (page <= totalPageNum) {
            return (
                <button type="button" style={(page === props.pageNum)?pagiButtonStyle.selected:pagiButtonStyle.unselected} onClick={()=>props.onClick(page)}>
                    {page}
                </button>
            )        
        }
    }


    const pagiHellip = () => {
        return (
            <p style={{fontSize: "1.3em", marginTop: "3pt",color: props.secondaryColor}}>
                &hellip;
            </p>
        )
    }

    // two major case:
    // 1. <= 6
    // 2. >= 6
    //      2.1 >=6 but user is within first 6 pages
    //      2.2 >=6 but user is within last 6 pages
    //      2.3 general case, in the middle

    if (totalPageNum <= 6) {
        return (
            <Container style={pagiStyle}>
                {pagiButton(1)}
                {pagiButton(2)}
                {pagiButton(3)}
                {pagiButton(4)}
                {pagiButton(5)}
                {pagiButton(6)}
            </Container>
        )        
    } else {
        if (props.pageNum <= 4) {
            // 1 2 3 4 5 ... 7
            return (
                <Container style={pagiStyle}>
                    {pagiButton(1)}
                    {pagiButton(2)}
                    {pagiButton(3)}
                    {pagiButton(4)}
                    {pagiButton(5)}
                    {pagiHellip()}
                    {pagiButton(totalPageNum)}
                </Container>
            )      
        } else if (totalPageNum - props.pageNum < 4) {
            // 1 ... 3 4 5 6 7
            return (
                <Container style={pagiStyle}>
                    {pagiButton(1)}
                    {pagiHellip()}
                    {pagiButton(totalPageNum-4)}
                    {pagiButton(totalPageNum-3)}
                    {pagiButton(totalPageNum-2)}
                    {pagiButton(totalPageNum-1)}
                    {pagiButton(totalPageNum)}
                </Container>
            )
        } else {
            // general case
            // 1 ... 43 44 45 ... 128
            return (
                <Container style={pagiStyle}>
                    {pagiButton(1)}
                    {pagiHellip()}
                    {pagiButton(props.pageNum-1)}
                    {pagiButton(props.pageNum)}
                    {pagiButton(props.pageNum+1)}
                    {pagiHellip()}
                    {pagiButton(totalPageNum)}
                </Container>
            )
        }
    }



}

  export default PaginationTag;
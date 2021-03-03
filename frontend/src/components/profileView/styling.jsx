/*
this file defines some global styling that profileView components shares
this file also defines colors
*/

// color
var color = {
    baseBlack: "#505050",
    baseWhite: "white",
    baseRed: "#FF5656",
    baseLightGrey: "#AAAAAA",
}

// font
var font = {
    segoeUI: "Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif",
}

// style
var style = {
    button: {
        style: {
            generic: {
                width: "70pt",
                height: "22pt",
                fontSize: "1.3em",
                fontWeight: "300",
                border: "none",
                color: color.baseWhite,
                backgroundColor: color.baseBlack,
                // boxShadow: "1pt 1pt 2pt #B1B1B1",    
            },
            focus: {
                width: "70pt",
                height: "22pt",
                fontSize: "1.3em",
                fontWeight: "300",
                border: "none",
                color: color.baseWhite,
                backgroundColor: color.baseRed,
            }
        },
        layout: {
            horizontalBetween: {
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "1em",
                paddingRight: "1em",
                paddingTop: "2em",
                paddingBottom: "1em",
                margin: "0",
            }
        }
    },
    text: {
        body: {
            fontSize: "1em",
            color: color.baseBlack,
            fontFamily: font.segoeUI,
        },
        heading: {
            fontSize: "2.5em",
            fontWeight: "350",
            color: color.baseBlack,
            fontFamily: font.segoeUI,
        }
    }
}

export {color, style};
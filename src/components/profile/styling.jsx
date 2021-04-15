var color = {
  baseBlack: "#505050",
  baseWhite: "white",
  baseRed: "#D18D8D",
  baseLightGrey: "#AAAAAA",
  baseGreyHard: "#8F8F8F",
  buttonGreen:"#99D4B4",
  buttonRed: "#DD7272",
  buttonOrange: "#E69942",
  postIcon: "#8fc9eb",
  backgroundGrey: "#fefefe",
  backgroundCream: "#F9F5EF",
  backgroundCreamLighter: "#FFFAF1",
};

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
      },
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
      },
    },
  },
  text: {
    body: {
      fontSize: "1em",
      color: color.baseBlack,
    },
    heading: {
      fontSize: "2.5em",
      fontWeight: "350",
      color: color.baseBlack,
    },
  },
};

var font = {
  segoeUI: "Arial",
}

export { color, style,font };

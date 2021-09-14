var color = {
    baseBlack: "#505050",
    baseWhite: "white",
    baseRed: "#D18D8D",
    baseLightGrey: "#8F8F8F",
    baseBackgroundDark: "#373737",
    buttonGreen:"#99D4B4",
    buttonRed: "#DD7272",
    buttonOrange: "#F68444",
    buttonBrown: "#B0835C",
    buttonBlue: "#54B2E9",
    buttonIndigo: "#7D99F5",
    postIcon: "#8fc9eb",
    backgroundGrey: "#C3C3C3",
    backgroundCream: "#FFF4E2",             // this one is actually ligter
    backgroundCreamLighter: "#FFF3DC",
    textLightGreyOnCream: "#9B9285",
}

var font = {
    segoeUI: "Arial",                       // was using segoeUI, but some browser, os doesnt support it. Our design heavily use "em" for sizing. therefore, 
                                            //for consistency. i changed it to Arial only (which should be supported by almost all broswer/os).
}
export {color, font};
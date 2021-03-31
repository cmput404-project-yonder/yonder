import { font, color } from "../components/stream/posts/styling";
import { style } from "../components/profile/styling";

export const categoriesStyle = {
  display: "flex",
  gap: "0.5em",
  color: color.baseLightGrey,
}

export const footerButtonLayoutStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  height: "13pt",
  paddingLeft: "3em",
  paddingRight: "3em",
}

export const postContentStyle = {
  marginLeft: "0.5em",
  marginRight: "0.5em",
  paddingBottom: "0.1em",
}


export const DescriptionStyle = {
  paddingBottom: "0.2em",
  color: color.baseLightGrey,
  marginLeft: "0.7em",
  // border: "dashed ", 
  // borderWidth: "0.1px",
  // borderRadius: "3pt",
}

export const dividorStyle = {
    marginTop: "0.5em",
    marginBottom: "0.5em",
  }

export const cardStyle = {
    borderRadius: "8pt",
    width: "450pt",
    height: "auto",
    boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.5)",
    backgroundColor: color.backgroundCream,
  }

export const postStyle = {
    boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.5)",
    borderRadius: "6pt",
    backgroundColor: color.backgroundCreamLighter,
    marginBottom: "2em",
    marginTop: "0.5em",
    fontFamily: font.segoeUI,
    fontWeight: "350",
    fontSize: "1.3em",
    color: color.baseBlack,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }

export const individualPostStyle = {
    boxShadow: "0pt 0pt 8pt #CCCCCC",
    borderRadius: "6pt",
    backgroundColor: color.backgroundCreamLighter,
    fontFamily: font.segoeUI,
    fontSize: "1.3em",
    color: color.baseBlack,
    margin: "4em auto",
    minHeight: "65vh",
    width: "65vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}

export const profileShowStyle = {
    width: "25em",
  };

export const statusStyle = {
    overall: {},
    displayName: Object.assign({}, style.text.heading, {
      textAlign: "center",
      paddingBottom: "1em",
      fontSize: "2.8em",
    }),
    statusBar: {
      overall: {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "1em",
      },
      block: {
        textAlign: "center",
        fontWeight: "400",
        fontSize: "1.2em",
        width: "100%",
      },
      counter: {
        fontSize: "0.9em",
      },
    },
  };
  
  export const infoStyle = {
    overall: {
      display: "flex",
      flexDirection: "column",
      paddingTop: "3em",
      paddingBottom: "1.5em",
      width: "auto",
    },
    banner: {
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  };
  
 export const svgIconStyle = {
    scale: "40",
    style: {
      fill: color.baseBlack,
      padding: "1.1em",
    },
  };
  


export const buttonLayerContainerStyle = {
    gridColumn: "1",
    gridRow: "1",
    width: "100%",
    height: "100%",
  }
  
export const streamLayerContainerStyle = {
    gridColumn: "1",
    gridRow: "1",
    width: "100%",
    height: "100%",
    
  }
export const signatureStyle = {
  display: "flex",
  float: "right",
  gap: "4pt",
  color: color.baseLightGrey,
  marginRight: "0.5em",
  marginTop: "0.1em",
  fontSize: "0.9em",
}

export const postContainerStyle = {
  paddingRight: "0.6em",
  paddingLeft: "0.6em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
}
export const newPostButtonStyle = {
    float: "right",
    zIndex: "1",
    position: "fixed",
    right: "5%",
    bottom: "5%",
    display: "flex",
    gap: "2em",
    flexDirection: "column",
  }
  
export const pageStyle = {
    display: "grid"
  }
  
export const postStreamStyle = {
  }

export const checkBoxLabelStyle = {
    paddingRight: "0.5em",
    fontWeight: "400",
    fontSize: "1.1em",
    color: color.baseLightGrey,
  }
  
export const checkBoxStyle = {
    paddingTop: "2em",
    paddingLeft: "1.8em",
    display: "flex",
    float: "left",
    justifyContent: "flex-start"
  }
  
export const checkMarkStyle = {
    paddingTop: "0.2em",
    fill: color.baseRed,
  }
  
  // used for display info like @author or header
  // empty for now
export const createPostHeaderStype = {
    display: "flex",
    padding: "0.5em",
  }
  
  
  
export const panelStyle = {
    display: "flex",
    justifyContent: "between",
    textAlign: "center",
    paddingTop: "0.2em",
    paddingBottom: "0em",
    fontSize: "1.35em",
    fontWeight: "350",
    paddingLeft: "1em",
    paddingRight: "1em",
  }
  
export const tabStyle = {
    width: "100%",
  }
  
export const submittPanelStyle = {
    margin: "0.5em",
    marginBottom: "0em",
    marginTop: "0em",
    paddingRight: "1.5em",
    paddingLeft: "1.5em",
  }
  
export const formContainerStyle = {
    boxShadow: "0pt 0pt 3pt #B1B1B1",
    borderRadius: "8pt",
    marginLeft: "-1.2em",
    marginRight: "-1.2em",
    paddingTop: "1em",
    paddingBottom: "1em",
    paddingRight: "1.5em",
    paddingLeft: "1.5em",
    backgroundColor: color.backgroundGrey,
  }
  
export const labelStyle = {
    paddingTop: "0.1em",
    paddingLeft: "0.5em",
    textAlign: "left",
    fontWeight: "400",
    color: color.baseLightGrey,
  }

export const postTitleStyle = {
    fontSize: "1.2em",
    fontWeight: "400",
    marginLeft: "0.5em",
  }

export const formTitleStyle = {
    overflowY: "hidden",
    whiteSpace: "nowrap",
    resize: "none",
    height: "35pt",
  }
  
export const buttonLayoutStyle = {
    display: "flex",
    width: "0em",
    float: "right",
    marginRight: "10em",       // the width of two button.
  }
  
export const postIconStyle = {
    scale: "70",
    style: {
      padding: "1em",
      fill: color.postIcon,
    }
  }

export const textStyle = {
    color: color.baseBlack,
    fontFamily: font.segoeUI,
    fontSize: "1.3em",
  }
  
export const authorStyle = {
    color: color.baseBlack,
    fontFamily: font.segoeUI,
    fontSize: "1em",
    fontWeight: "400",
    textAlign: "right",
    paddingRight: "0.8em",
  }
  
export const contentStyle = {
    paddingTop: "3em",
    paddingBottom: "2em",
    textIndent: "2em",
    textAlign: "justify",
    fontSize: "1.2em",
    paddingLeft: "2.2em",
    paddingRight: "2.2em",
  }

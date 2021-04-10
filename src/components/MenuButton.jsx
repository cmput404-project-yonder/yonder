import { Container, Button } from "react-bulma-components";

// local styling
var buttonStyle = {
    scale: "42",
    style: {
        button: {
            height: "4em",
            width: "4em",
            borderRadius: "100%",
            // boxShadow: "0pt 0pt 6pt rgb(0,0,0,0.5)",
            backgroundColor: "#D57398",
            border: "none",
        },
        icon: {
            paddingTop: "3pt",
            paddingLeft: "0pt",
            fill: "white",
        }
    }
}

// component
function MenuButton(props) {

    return (
        <Container style={props.style}>
            <Button style={buttonStyle.style.button} onClick={props.action}>
                <Container style={buttonStyle.style.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} viewBox="0 0 512 450">
                    <g id="burger" transform="translate(0 -31)">
                    <path id="Path_169" data-name="Path 169" d="M512,256a45.07,45.07,0,0,0-30.275-42.513C479.02,152.5,456.252,105.7,413.94,74.255,375.323,45.553,322.185,31,256,31S136.677,45.553,98.06,74.256C55.748,105.7,32.98,152.5,30.275,213.488A44.954,44.954,0,0,0,11.495,286a44.954,44.954,0,0,0,19.1,72.623C37.033,427.165,95.3,481,166,481H346c70.7,0,128.967-53.835,135.4-122.377A44.954,44.954,0,0,0,500.505,286,44.817,44.817,0,0,0,512,256ZM256,61c86.031,0,187.942,26.52,195.531,150H60.469C68.058,87.52,169.969,61,256,61ZM45,241H467a15,15,0,0,1,0,30H45a15,15,0,0,1,0-30ZM346,451H166c-53.307,0-97.543-39.183-104.914-90H75c10.028,0,13.2,3.411,19.509,10.208C102.267,379.561,112.892,391,136,391c23.271,0,33.619-11.556,41.175-19.994C183.141,364.344,186.135,361,196,361s12.859,3.344,18.825,10.006C222.381,379.444,232.729,391,256,391s33.619-11.556,41.175-19.994C303.141,364.344,306.135,361,316,361s12.859,3.344,18.825,10.006C342.381,379.444,352.729,391,376,391s33.619-11.556,41.175-19.994C423.141,364.344,426.135,361,436,361h14.914C443.543,411.817,399.307,451,346,451ZM467,331H436c-23.271,0-33.619,11.556-41.175,19.994C388.859,357.656,385.865,361,376,361s-12.859-3.344-18.825-10.006C349.619,342.556,339.271,331,316,331s-33.619,11.556-41.175,19.994C268.859,357.656,265.865,361,256,361s-12.859-3.344-18.825-10.006C229.619,342.556,219.271,331,196,331s-33.619,11.556-41.175,19.994C148.859,357.656,145.865,361,136,361c-10.028,0-13.2-3.411-19.509-10.208C108.733,342.439,98.108,331,75,331H45a15,15,0,0,1,0-30H467a15,15,0,0,1,0,30Z"/>
                    <circle id="Ellipse_33" data-name="Ellipse 33" cx="15" cy="15" r="15" transform="translate(151 151)"/>
                    <circle id="Ellipse_34" data-name="Ellipse 34" cx="15" cy="15" r="15" transform="translate(331 151)"/>
                    <circle id="Ellipse_35" data-name="Ellipse 35" cx="15" cy="15" r="15" transform="translate(271 121)"/>
                    <circle id="Ellipse_36" data-name="Ellipse 36" cx="15" cy="15" r="15" transform="translate(211 91)"/>
                    </g>
                    </svg>
                </Container>
            </Button>
        </Container>
    );
}

export default MenuButton;
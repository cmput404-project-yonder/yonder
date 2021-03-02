/*
SVG components:
    cancelButton
    confirmButton
*/

function CancelButton(props) {
    //https://www.flaticon.com/free-icon/
    return (
        <svg id="cancelButton" data-name="cancelButton" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 65 64.999">
        <path id="Path_01" data-name="Path 01" class="cls-1" d="M55.492,9.513a32.5,32.5,0,1,0,0,45.985A32.552,32.552,0,0,0,55.492,9.513ZM45.91,42.086a2.709,2.709,0,1,1-3.831,3.831L32.5,36.336l-9.576,9.578a2.709,2.709,0,0,1-3.831-3.831L28.669,32.5l-9.578-9.578a2.709,2.709,0,0,1,3.831-3.831L32.5,28.673l9.578-9.578a2.709,2.709,0,0,1,3.831,3.831L36.332,32.5Z" transform="translate(0 -0.005)"/>
        </svg>      
    );
}

function ConfirmButton(props) {
    //https://www.flaticon.com/free-icon/
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 65 64.675">
        <path id="Path_02" data-name="Path 02" class="cls-1" d="M32.5,0A 32.338,32.338,0,1,0,65,32.338,32.456,32.456,0,0,0,32.5,0ZM47.493,27.355,30.429,44.335a1.023,1.023,0,0,1-1.4,0L17.58,32.944a.977.977,0,0,1-.289-.7.989.989,0,0,1,.289-.7l1.463-1.455a1,1,0,0,1,1.4,0l8.925,8.88a.506.506,0,0,0,.717,0L44.628,24.5a1.024,1.024,0,0,1,1.4,0l1.463,1.458a.981.981,0,0,1,0,1.395Z" transform="translate(-0.004)"/>
        </svg>  
    );
}

export { CancelButton, ConfirmButton };
/*
SVG components:
    cancelButton
    confirmButton
*/

function CancelButton(props) {
    // https://www.flaticon.com/free-icon/
    return (
        <svg id="cancelButton" data-name="cancelButton" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 65 64.999">
        <path id="Path_01" data-name="Path 01" class="cls-1" d="M55.492,9.513a32.5,32.5,0,1,0,0,45.985A32.552,32.552,0,0,0,55.492,9.513ZM45.91,42.086a2.709,2.709,0,1,1-3.831,3.831L32.5,36.336l-9.576,9.578a2.709,2.709,0,0,1-3.831-3.831L28.669,32.5l-9.578-9.578a2.709,2.709,0,0,1,3.831-3.831L32.5,28.673l9.578-9.578a2.709,2.709,0,0,1,3.831,3.831L36.332,32.5Z" transform="translate(0 -0.005)"/>
        </svg>      
    );
}

function ConfirmButton(props) {
    // https://www.flaticon.com/free-icon/
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 65 64.675">
        <path id="Path_02" data-name="Path 02" class="cls-1" d="M32.5,0A 32.338,32.338,0,1,0,65,32.338,32.456,32.456,0,0,0,32.5,0ZM47.493,27.355,30.429,44.335a1.023,1.023,0,0,1-1.4,0L17.58,32.944a.977.977,0,0,1-.289-.7.989.989,0,0,1,.289-.7l1.463-1.455a1,1,0,0,1,1.4,0l8.925,8.88a.506.506,0,0,0,.717,0L44.628,24.5a1.024,1.024,0,0,1,1.4,0l1.463,1.458a.981.981,0,0,1,0,1.395Z" transform="translate(-0.004)"/>
        </svg>  
    );
}

function YonderMainLogo(props) {
    // a placeholder
    return (
        <svg id="YonderLogo" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 124.732 124.83">
        <g id="Group_31" data-name="Group 31" transform="translate(-591.671 -239.431) rotate(-12)">
        <path id="Path_90" d="M54.311,13.35c-.52-.006-1.037,0-1.549.012a44.685,44.685,0,0,0-6.822.717,42.066,42.066,0,0,0-19.93,9.543C18.471,29.92,15.783,39.27,15.783,39.27l12.539.9,1.326,5.514s-2.741-1.239-6.32-2.586-8-2.8-8-2.8-4.394,12.156.084,24.873,16.8,20.578,16.8,20.578a19.8,19.8,0,0,1,4.65-3.477,30.388,30.388,0,0,1,5.209-2.023A15.646,15.646,0,0,0,40.459,73.3a16.87,16.87,0,0,0-5.166-5.164L33.936,57.514l-8.781,7.795-3.836-.953,11.254-9,.641-3.764,4.707,1.627a8.632,8.632,0,0,0-1.258,3.314,26.307,26.307,0,0,0-.061,4.85c.059,2.695.441,5.857.441,5.857s4.759,2.929,5.49,4.41S44,79.746,44,79.746l17.568-4.363S78.114,71.713,79.8,70.93c3.492-1.621,9.859-6.246,9.859-6.246s3.134-10.955,1.17-20.418-6.427-14.452-10.312-19-9.142-7.3-15.357-9.9A29.227,29.227,0,0,0,54.311,13.35Zm-1.953,8.387,4.85,1.045s-1.179.236-5.969,3.574-13.2,9.781-13.2,9.781l-4.814-.6s5.013-3.032,9.8-6.482S52.357,21.736,52.357,21.736ZM63.363,31.18l5.106.877L54.533,40.916,59.1,42.828l.254,3.272s4.964,12.719,8.236,14.307,9.843-2.868,10.449-4.826-5.2-11.35-5.2-11.35l1.061-.541s5.355,8.277,6.414,9.65a8.494,8.494,0,0,0,2.4,2.1s-1.283,2-5.221,4.646-6.76,4.894-10.914,3.033c-2.278-1.02-5.093-6.653-7.625-11.809C57.03,47.39,55.18,43.763,54.9,43.346a4.6,4.6,0,0,0-1.631-1.4L47.756,45.9l4.125,1.947a7.8,7.8,0,0,0-.443,3.256A42.4,42.4,0,0,1,52.67,64.123a39.284,39.284,0,0,1-3.555,12.559l-.152-.023-1.221-.193A41.535,41.535,0,0,0,50.25,63.842a51.749,51.749,0,0,0-1.977-13.623l-1.855-3.641-5.2,4.789-4.7-1.275a70.946,70.946,0,0,0,9.635-6.055C52.863,39.309,63.363,31.18,63.363,31.18Zm25.119,36.4-6.887,7.1L69.08,76.369S45.3,81.2,41.125,83.27a16.743,16.743,0,0,0-5.768,4.2s4.2,2.823,13.274,4.008,19.832-2.129,28.738-8.871S88.482,67.58,88.482,67.58Z" transform="matrix(0.891, 0.454, -0.454, 0.891, 554.113, 360.621)"/>
        </g>
        </svg>
    );
}

function TextIcon(props) {
    // a placeholder
    return (
        <svg id="Text" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 103.001 102.993">
        <path id="Ellipse_20" d="M69.83,18.185A51.492,51.492,0,1,0,115.1,45.523,51.491,51.491,0,0,0,69.83,18.185ZM61.008,46.408l2.2,4.1L49.646,57.576,71.832,99.342l-4.068,2.416L45.184,59.3,32.1,66.691l-1.91-4.105Zm30.623.014L89.459,69.463,108.5,79.691l-5.277,2.637L87.734,73.2l-.705,18.1-5.238,2.895,2.574-22.6L65.029,60.953l4.508-2.746,16.186,9.824,1.328-18.9Z" transform="translate(-18.128 -18.185)"/>
        </svg>
    );
}

function ImageIcon(props) {
    // a placeholder
    return (
        <svg id="Image" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 103.001 102.993">
        <path id="Ellipse_22" d="M69.83,18.185A51.492,51.492,0,1,0,115.1,45.523,51.491,51.491,0,0,0,69.83,18.185ZM89.4,41a10.949,10.949,0,0,1,10.283,6.166c3.607,7.017,12.541,22.629,12.541,22.629l-4.266,2.334S98.5,52.748,95.727,49.352s-5.654-5.228-10.945-3.059-5.357,8.315-4.992,10.947S91.863,80.582,91.863,80.582l-4.1,2.656S77.161,61.9,75.086,59.652,69.194,54.1,63.531,57.24s-4.105,10.785-4.105,10.785L71.178,91.932l-4.023,2.174L49.688,61.426l3.619-2.17,3.381,4.99a11.492,11.492,0,0,1,2.162-7.3,10.832,10.832,0,0,1,10.2-5.1,14.762,14.762,0,0,1,7.6,3.061s.124-8.217,5.76-11.768A13.779,13.779,0,0,1,89.4,41ZM31.256,53.777,55.8,99.578,51.3,102.154l-24.229-45.8Z" transform="translate(-18.128 -18.185)"/>
        </svg>
    );
}

function MarkdownIcon(props) {
    // a placeholder
    return (
        <svg id="Markdown" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 103.001 102.993">
        <path id="Ellipse_21" d="M69.83,18.185A51.492,51.492,0,1,0,115.1,45.523,51.491,51.491,0,0,0,69.83,18.185ZM98.574,38.055l1.692,3.543s-4.538-1.028-6.68,6.412,9.978,25.383,9.978,25.383l-3.3,1.932L84.326,45.863l3.381-1.932,3.541,6.358s-.911-4.516,1.521-7.916a11.716,11.716,0,0,1,5.8-4.318Zm-30.2,7.367L88.234,82.178,84.924,83.99,68.375,52.09l3.236,39.365L69.625,92.5,38.8,68.039,56.285,99.432l-3.668,1.81L32.9,65l4.246-2.539L67.656,86.6,64.563,47.742Z" transform="translate(-18.128 -18.185)"/>
        </svg>
    );
}

function CheckBoxChecked(props) {
    return (
        <svg id="check-box-outline" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 100 100">
        <path id="Path_139" data-name="Path 139" d="M27.222,39.444l-7.778,7.778,25,25L100,16.667,92.222,8.889,44.444,56.667ZM88.889,88.889H11.111V11.111H66.667V0H11.111A11.144,11.144,0,0,0,0,11.111V88.889A11.144,11.144,0,0,0,11.111,100H88.889A11.144,11.144,0,0,0,100,88.889V44.444H88.889Z"/>
        </svg>
    )
}

function CheckBoxUnchecked(props) {
    return (
        <svg id="check-box-outline-blank" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 100 100">
        <path id="Path_138" data-name="Path 138" d="M88.889,11.111V88.889H11.111V11.111H88.889M88.889,0H11.111A11.144,11.144,0,0,0,0,11.111V88.889A11.144,11.144,0,0,0,11.111,100H88.889A11.144,11.144,0,0,0,100,88.889V11.111A11.144,11.144,0,0,0,88.889,0Z"/>
        </svg>
    )
}

function AddIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 100 100">
        <path id="add" d="M91.071,41.071H60.714a1.786,1.786,0,0,1-1.786-1.786V8.929a8.929,8.929,0,1,0-17.857,0V39.286a1.786,1.786,0,0,1-1.786,1.786H8.929a8.929,8.929,0,1,0,0,17.857H39.286a1.786,1.786,0,0,1,1.786,1.786V91.071a8.929,8.929,0,1,0,17.857,0V60.714a1.786,1.786,0,0,1,1.786-1.786H91.071a8.929,8.929,0,1,0,0-17.857Zm0,0"/>
        </svg>
    )
}

function PencilIcon(props) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 43.814 43.768">
        <g id="pencil" transform="translate(0 -0.247)">
        <path id="Path_142" data-name="Path 142" d="M27.057,82.473,2.95,106.582a.961.961,0,0,0-.251.44L.027,117.747a.949.949,0,0,0,.92,1.179.943.943,0,0,0,.23-.028L11.9,116.225a.948.948,0,0,0,.44-.25L36.452,91.867Zm0,0" transform="translate(0 -74.911)"/>
        <path id="Path_143" data-name="Path 143" d="M347.01,4.275l-2.684-2.684a4.859,4.859,0,0,0-6.711,0l-3.287,3.287,9.394,9.394,3.287-3.287a4.747,4.747,0,0,0,0-6.711Zm0,0" transform="translate(-304.585 0)"/>
        </g>
        </svg>
    )
}

function SharingIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 39.047 35.612">
        <path id="_1059157" data-name="1059157" d="M39.048,18.294,22.821.5V11.116h-3.45A19.37,19.37,0,0,0,0,30.486v5.626l1.532-1.679a27.5,27.5,0,0,1,20.311-8.961h.977V36.088Zm0,0" transform="translate(-0.001 -0.5)" />
        </svg>
    )
}

function LikeIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 36.115 34.61">
        <g id="_633991" data-name="633991" transform="translate(0 -10.667)">
        <g id="Group_35" data-name="Group 35" transform="translate(0 25.715)">
        <g id="Group_34" data-name="Group 34">
        <path id="Path_100" data-name="Path 100" d="M3.762,224A3.767,3.767,0,0,0,0,227.762V239.8a3.767,3.767,0,0,0,3.762,3.762H8.276a3.735,3.735,0,0,0,2.257-.761V224Z" transform="translate(0 -224)"/>
        </g>
        </g>
        <g id="Group_37" data-name="Group 37" transform="translate(12.038 10.667)">
        <g id="Group_36" data-name="Group 36">
        <path id="Path_101" data-name="Path 101" d="M194.744,31.358a3.337,3.337,0,0,0-.98-2.369,3.736,3.736,0,0,0,.963-2.873,3.89,3.89,0,0,0-3.924-3.411h-9.3a21.637,21.637,0,0,0,1.2-6.019c0-3.264-2.773-6.019-4.514-6.019a4.733,4.733,0,0,0-2.728.916.756.756,0,0,0-.281.588v5.1l-4.334,9.388-.181.092V42.883a9.859,9.859,0,0,0,3.762.889h13.813a3.461,3.461,0,0,0,3.41-2.629,3.385,3.385,0,0,0-.272-2.26,3.37,3.37,0,0,0,1.506-4.516A3.369,3.369,0,0,0,194.744,31.358Z" transform="translate(-170.667 -10.667)"/>
        </g>
        </g>
        </g>
        </svg>
    )
}

export { CancelButton, ConfirmButton, YonderMainLogo, TextIcon, ImageIcon, MarkdownIcon, CheckBoxChecked, CheckBoxUnchecked, AddIcon, PencilIcon, LikeIcon, SharingIcon};
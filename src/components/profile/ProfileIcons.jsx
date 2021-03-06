/*
SVG components:
    ProfileIcon
*/

function ProfileIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.svgScale} viewBox="0 0 130.764 130.764">
      <g id="Group_47" data-name="Group 47" transform="translate(-804.583 -705.414)">
        <path
          id="Ellipse_23"
          d="M65.352,0a65.4,65.4,0,1,0,.03,0Zm.031,23.889c14.251,0,16.707,9.085,16.707,20.293S74.61,64.475,65.383,64.475,48.676,55.39,48.676,44.182,51.132,23.889,65.383,23.889ZM56.234,66.031s2.746,3.5,9.148,3.5,9.149-3.5,9.149-3.5C94.043,69.553,96.593,75.117,96.9,94.641a12.572,12.572,0,0,0,.031,1.354v1.518s-4.644,9.365-31.553,9.365-31.555-9.365-31.555-9.365V95.461c.005.18.018.1.047-1.455C34.233,75,36.934,69.514,56.234,66.031Z"
          transform="translate(804.583 705.414)"
        />
        <g id="_74472" data-name="74472" transform="translate(838.406 729.303)">
          <path
            id="Path_125"
            data-name="Path 125"
            className="cls-1"
            d="M41.9,300.723C41.9,300.04,41.894,300.53,41.9,300.723Z"
            transform="translate(-41.895 -229.152)"
          />
          <path
            id="Path_126"
            data-name="Path 126"
            className="cls-1"
            d="M308.085,302.107C308.094,301.92,308.085,300.807,308.085,302.107Z"
            transform="translate(-244.97 -230.002)"
          />
        </g>
      </g>
    </svg>
  );
}

function YonderLogo(props) {
  // notice, this is a placeholder that i made, not actual logo.
  // is used in profileView, followed by user uuid
  return (
    <svg
      data-name="Logo placeholder svg"
      xmlns="http://www.w3.org/2000/svg"
      width={props.svgScale}
      viewBox="0 0 26.288 26.277"
    >
      <path
        id="Path_88"
        data-name="Path 88"
        className="cls-1"
        d="M2466.949,1477.3l5.764,8.891a46.631,46.631,0,0,1,0,5.622c-.223,1.166-2.808.655-2.808.655v.986h8.128v-.986s-2.769.5-2.792-.655-.066-5.622-.066-5.622,3.544-6.326,4.436-8.009a2.85,2.85,0,0,1,2.756-1.457v-.9h-6.7v.9a3.7,3.7,0,0,1,1.719.2c.591.325,1.12.808.13,2.66s-2.9,5.3-2.9,5.3-4.455-6.675-4.561-7.49,2.459-.665,2.459-.665v-.9h-4.531a16.158,16.158,0,0,1,2.95-2.62,12.438,12.438,0,0,1,5.174-2.007,11.441,11.441,0,0,1,5.338.228,12.222,12.222,0,0,1,5.032,2.557,13.59,13.59,0,0,1,3.031,3.54,13.32,13.32,0,0,1,1.69,4.814,12.56,12.56,0,0,1-.669,6.291,12.365,12.365,0,0,1-4.907,6.35,14.034,14.034,0,0,1-10.162,2.081,16.253,16.253,0,0,1-6.39-3.345,13.118,13.118,0,0,1-3.276-4.95,14.424,14.424,0,0,1-.612-6.583A16.629,16.629,0,0,1,2466.949,1477.3Z"
        transform="translate(-2465.041 -1470.994)"
      />
    </svg>
  );
}

function EditButton(props) {
  // https://www.flaticon.com/free-icon/pencil_181540?term=edit&page=1&position=19&page=1&position=19&related_id=181540&origin=search
  // free license
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.svgScale} viewBox="0 0 119.556 127.997">
      <g id="user" transform="translate(-48.043 -32)">
        <path id="Path_156" data-name="Path 156" d="M256,443.834l13.51-3.118-10.392-10.392Z" transform="translate(-148.183 -283.836)"/>
        <path id="Path_157" data-name="Path 157" d="M105.148,276.511l2.235-9.686c.005-.024.014-.046.02-.07.011-.04.021-.08.034-.119s.025-.072.039-.108.025-.067.04-.1.036-.078.055-.115.029-.056.043-.083.046-.079.07-.117.031-.049.047-.072.054-.076.083-.112.035-.045.053-.067.061-.069.093-.1c.013-.013.024-.029.038-.041l30.123-30.124C129.712,218.3,114.161,208,96.318,208a44.7,44.7,0,0,0-34.037,15.769c-8.928,10.242-13.959,24.517-14.238,40.323,5.278,2.662,26.951,12.889,48.275,12.889a85.653,85.653,0,0,0,8.83-.471Z" transform="translate(0 -125.413)"/>
        <path id="Path_158" data-name="Path 158" d="M0,0H50.586V18.4H0Z" transform="translate(112.857 141.926) rotate(-45)"/>
        <circle id="Ellipse_30" data-name="Ellipse 30" cx="22.994" cy="22.994" r="22.994" transform="translate(73.324 32)"/>
        <path id="Path_159" data-name="Path 159" d="M425.074,278.524a9.2,9.2,0,0,0-15.7-6.5l13.007,13.007A9.136,9.136,0,0,0,425.074,278.524Z" transform="translate(-257.475 -169.114)"/>
      </g>
    </svg>
  );
}

function GithubLogo(props) {
  // github official svg logo
  return (
    <svg
      data-name="Github logo vector"
      xmlns="http://www.w3.org/2000/svg"
      width={props.svgScale}
      viewBox="0 0 26.943 26.277"
    >
      <path
        id="Path_4"
        data-name="Path 4"
        className="cls-1"
        d="M303.692,58.431a13.473,13.473,0,0,0-4.259,26.254c.673.124.92-.292.92-.648,0-.321-.012-1.382-.018-2.508-3.748.815-4.539-1.589-4.539-1.589a3.568,3.568,0,0,0-1.5-1.971c-1.222-.836.092-.819.092-.819a2.832,2.832,0,0,1,2.065,1.388,2.868,2.868,0,0,0,3.92,1.12,2.87,2.87,0,0,1,.855-1.8c-2.992-.34-6.138-1.5-6.138-6.658a5.213,5.213,0,0,1,1.388-3.616,4.841,4.841,0,0,1,.13-3.565s1.131-.362,3.706,1.381a12.772,12.772,0,0,1,6.747,0c2.571-1.743,3.7-1.381,3.7-1.381a4.835,4.835,0,0,1,.132,3.565,5.2,5.2,0,0,1,1.386,3.616c0,5.174-3.151,6.313-6.151,6.647a3.221,3.221,0,0,1,.914,2.495c0,1.8-.016,3.253-.016,3.7,0,.359.242.779.925.646a13.473,13.473,0,0,0-4.266-26.252Z"
        transform="translate(-290.221 -58.431)"
      />
      <path
        id="Path_5"
        data-name="Path 5"
        className="cls-2"
        d="M311.837,144.339c-.03.067-.135.087-.231.041s-.153-.135-.121-.2.135-.088.232-.042.154.136.12.2Zm-.166-.123"
        transform="translate(-306.734 -124.997)"
      />
      <path
        id="Path_6"
        data-name="Path 6"
        className="cls-2"
        d="M314.306,146.562c-.064.059-.19.032-.275-.062a.206.206,0,0,1-.039-.28c.066-.06.188-.032.276.062s.105.22.038.28Zm-.129-.138"
        transform="translate(-308.658 -126.612)"
      />
      <path
        id="Path_7"
        data-name="Path 7"
        className="cls-2"
        d="M316.657,149.736c-.083.058-.218,0-.3-.116s-.083-.264,0-.321.217-.006.3.113.082.266,0,.324Zm0,0"
        transform="translate(-310.478 -129.01)"
      />
      <path
        id="Path_8"
        data-name="Path 8"
        className="cls-2"
        d="M319.572,153.152c-.074.081-.231.059-.346-.052a.259.259,0,0,1-.077-.344c.075-.081.233-.058.349.052s.153.263.074.344Zm0,0"
        transform="translate(-312.666 -131.676)"
      />
      <path
        id="Path_9"
        data-name="Path 9"
        className="cls-2"
        d="M323.719,155.627c-.033.105-.184.153-.337.108s-.252-.17-.221-.276.184-.156.338-.108.252.168.22.276Zm0,0"
        transform="translate(-315.809 -133.716)"
      />
      <path
        id="Path_10"
        data-name="Path 10"
        className="cls-2"
        d="M328.608,156.328c0,.111-.126.2-.286.205s-.291-.086-.293-.2.126-.2.288-.206.291.086.291.2Zm0,0"
        transform="translate(-319.595 -134.337)"
      />
      <path
        id="Path_11"
        data-name="Path 11"
        className="cls-2"
        d="M333.223,155.695c.019.108-.092.22-.251.249s-.3-.038-.321-.146.094-.222.25-.251.3.037.322.148Zm0,0"
        transform="translate(-323.184 -133.877)"
      />
    </svg>
  );
}

export { ProfileIcon, YonderLogo, GithubLogo, EditButton };

/*
SVG components:
    YonderLogo
    GithubLogo
*/

function YonderLogo(props) {
  // notice, this is a placeholder that i made, not actual logo.
  // is used in profileView, followed by user uuid
  return (
    <svg
      data-name="Logo placeholder svg"
      xmlns="http://www.w3.org/2000/svg"
      width={props.svgScale}
      height="auto"
      viewBox="0 0 26.288 26.277"
    >
      <path
        id="Path_88"
        data-name="Path 88"
        class="cls-1"
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
    <svg id="Edit" xmlns="http://www.w3.org/2000/svg" width={props.svgScale} height="auto" viewBox="0 0 32.009 32.009">
      <path
        id="Path_89"
        data-name="Path 89"
        class="cls-1"
        d="M16.005,0A16,16,0,1,0,32.01,16,16,16,0,0,0,16.005,0Zm7.608,11.518-1.52,1.52L19,9.944l-1.174,1.174,3.094,3.094L13.33,21.8l-3.094-3.094L9.062,19.881l3.094,3.094-.756.756-.014-.014a.6.6,0,0,1-.382.275l-2.885.643a.6.6,0,0,1-.716-.716l.643-2.885a.6.6,0,0,1,.275-.382l-.015-.015L20.519,8.423a.459.459,0,0,1,.649,0l2.446,2.445A.459.459,0,0,1,23.613,11.518Z"
        transform="translate(-0.001)"
      />
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
      height="auto"
      viewBox="0 0 26.943 26.277"
    >
      <path
        id="Path_4"
        data-name="Path 4"
        class="cls-1"
        d="M303.692,58.431a13.473,13.473,0,0,0-4.259,26.254c.673.124.92-.292.92-.648,0-.321-.012-1.382-.018-2.508-3.748.815-4.539-1.589-4.539-1.589a3.568,3.568,0,0,0-1.5-1.971c-1.222-.836.092-.819.092-.819a2.832,2.832,0,0,1,2.065,1.388,2.868,2.868,0,0,0,3.92,1.12,2.87,2.87,0,0,1,.855-1.8c-2.992-.34-6.138-1.5-6.138-6.658a5.213,5.213,0,0,1,1.388-3.616,4.841,4.841,0,0,1,.13-3.565s1.131-.362,3.706,1.381a12.772,12.772,0,0,1,6.747,0c2.571-1.743,3.7-1.381,3.7-1.381a4.835,4.835,0,0,1,.132,3.565,5.2,5.2,0,0,1,1.386,3.616c0,5.174-3.151,6.313-6.151,6.647a3.221,3.221,0,0,1,.914,2.495c0,1.8-.016,3.253-.016,3.7,0,.359.242.779.925.646a13.473,13.473,0,0,0-4.266-26.252Z"
        transform="translate(-290.221 -58.431)"
      />
      <path
        id="Path_5"
        data-name="Path 5"
        class="cls-2"
        d="M311.837,144.339c-.03.067-.135.087-.231.041s-.153-.135-.121-.2.135-.088.232-.042.154.136.12.2Zm-.166-.123"
        transform="translate(-306.734 -124.997)"
      />
      <path
        id="Path_6"
        data-name="Path 6"
        class="cls-2"
        d="M314.306,146.562c-.064.059-.19.032-.275-.062a.206.206,0,0,1-.039-.28c.066-.06.188-.032.276.062s.105.22.038.28Zm-.129-.138"
        transform="translate(-308.658 -126.612)"
      />
      <path
        id="Path_7"
        data-name="Path 7"
        class="cls-2"
        d="M316.657,149.736c-.083.058-.218,0-.3-.116s-.083-.264,0-.321.217-.006.3.113.082.266,0,.324Zm0,0"
        transform="translate(-310.478 -129.01)"
      />
      <path
        id="Path_8"
        data-name="Path 8"
        class="cls-2"
        d="M319.572,153.152c-.074.081-.231.059-.346-.052a.259.259,0,0,1-.077-.344c.075-.081.233-.058.349.052s.153.263.074.344Zm0,0"
        transform="translate(-312.666 -131.676)"
      />
      <path
        id="Path_9"
        data-name="Path 9"
        class="cls-2"
        d="M323.719,155.627c-.033.105-.184.153-.337.108s-.252-.17-.221-.276.184-.156.338-.108.252.168.22.276Zm0,0"
        transform="translate(-315.809 -133.716)"
      />
      <path
        id="Path_10"
        data-name="Path 10"
        class="cls-2"
        d="M328.608,156.328c0,.111-.126.2-.286.205s-.291-.086-.293-.2.126-.2.288-.206.291.086.291.2Zm0,0"
        transform="translate(-319.595 -134.337)"
      />
      <path
        id="Path_11"
        data-name="Path 11"
        class="cls-2"
        d="M333.223,155.695c.019.108-.092.22-.251.249s-.3-.038-.321-.146.094-.222.25-.251.3.037.322.148Zm0,0"
        transform="translate(-323.184 -133.877)"
      />
    </svg>
  );
}

export { YonderLogo, GithubLogo, EditButton };

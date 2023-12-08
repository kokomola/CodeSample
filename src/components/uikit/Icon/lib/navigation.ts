export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Navigation@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Navigation" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M4.965,5.096 L8.511,17.506 L11.551,11.426 L17.188,9.171 L4.965,5.096 Z M2.899,2.3 L21.705,8.568 C21.9043848,8.63408719 22.0412055,8.8177469 22.0474663,9.02770548 C22.053727,9.23766406 21.9280927,9.4291499 21.733,9.507 L13,13 L8.575,21.85 C8.48283764,22.0344491 8.28690041,22.1434074 8.08158758,22.1243806 C7.87627474,22.1053537 7.70369723,21.9622443 7.647,21.764 L2.26,2.911 C2.20914424,2.7324982 2.26135125,2.54051359 2.39560009,2.41234789 C2.52984894,2.28418219 2.7240465,2.24092745 2.9,2.3 L2.899,2.3 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

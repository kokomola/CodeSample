export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Arrow right@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Arrow-right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M13.6464466,12.3535534 L10.8535534,15.1464466 C10.6582912,15.3417088 10.3417088,15.3417088 10.1464466,15.1464466 C10.0526784,15.0526784 10,14.9255015 10,14.7928932 L10,9.20710678 C10,8.93096441 10.2238576,8.70710678 10.5,8.70710678 C10.6326082,8.70710678 10.7597852,8.7597852 10.8535534,8.85355339 L13.6464466,11.6464466 C13.8417088,11.8417088 13.8417088,12.1582912 13.6464466,12.3535534 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

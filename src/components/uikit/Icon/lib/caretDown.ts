export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Arrow drop@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Arrow-drop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M11.6464466,13.6464466 L8.85355339,10.8535534 C8.65829124,10.6582912 8.65829124,10.3417088 8.85355339,10.1464466 C8.94732158,10.0526784 9.07449854,10 9.20710678,10 L14.7928932,10 C15.0690356,10 15.2928932,10.2238576 15.2928932,10.5 C15.2928932,10.6326082 15.2402148,10.7597852 15.1464466,10.8535534 L12.3535534,13.6464466 C12.1582912,13.8417088 11.8417088,13.8417088 11.6464466,13.6464466 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

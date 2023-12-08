export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Copy@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M7,6 L7,3 C7,2.44771525 7.44771525,2 8,2 L20,2 C20.5522847,2 21,2.44771525 21,3 L21,17 C21,17.5522847 20.5522847,18 20,18 L17,18 L17,21 C17,21.552 16.55,22.000018 15.993,22.000018 L4.007,22.000018 C3.74065346,22.0015966 3.48465319,21.8969771 3.29565863,21.7092963 C3.10666406,21.5216155 3.0002613,21.2663512 3,21 L3.003,7 C3.003,6.448 3.453,6 4.01,6 L7,6 Z M5.003,8 L5,20 L15,20 L15,8 L5.003,8 Z M9,6 L16,6 C16.5522847,6 17,6.44771525 17,7 L17,16 L17,16 L19,16 L19,4 L9,4 L9,6 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

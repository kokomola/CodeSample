export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Doc@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Doc" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M21.0000247,8 L21.0000247,20.993 C21.001863,21.2582184 20.8982888,21.5133136 20.7120638,21.7021642 C20.5258387,21.8910147 20.2722185,21.99815 20.007,22 L3.993,22 C3.44497153,22 3.00055189,21.5560282 3,21.008 L3,2.992 C3,2.455 3.449,2 4.002,2 L14.997,2 L21.0000247,8 Z M19,9 L14.5,9 C14.2238576,9 14,8.77614237 14,8.5 L14,4 L14,4 L5,4 L5,20 L19,20 L19,9 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

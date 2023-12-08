export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Check indeterminate@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Check-indeterminate" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <rect id="Shape" fill="${color}" x="6" y="11" width="12" height="2" rx="0.5"></rect>
      </g>
  </svg>
`;

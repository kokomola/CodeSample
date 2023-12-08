export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Add@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Add" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M11,11 L11,5.5 C11,5.22385763 11.2238576,5 11.5,5 L12.5,5 C12.7761424,5 13,5.22385763 13,5.5 L13,11 L13,11 L18.5,11 C18.7761424,11 19,11.2238576 19,11.5 L19,12.5 C19,12.7761424 18.7761424,13 18.5,13 L13,13 L13,13 L13,18.5 C13,18.7761424 12.7761424,19 12.5,19 L11.5,19 C11.2238576,19 11,18.7761424 11,18.5 L11,13 L11,13 L5.5,13 C5.22385763,13 5,12.7761424 5,12.5 L5,11.5 C5,11.2238576 5.22385763,11 5.5,11 L11,11 L11,11 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Security@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Security" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M3.783,2.826 L12,1 L20.217,2.826 C20.6744415,2.92768786 21,3.3333923 21,3.802 L21,13.789 C21,15.7950504 19.9971796,17.6683107 18.328,18.781 L12,23 L5.672,18.781 C4.0031151,17.6685073 3.00048003,15.795696 3,13.79 L3,3.802 C3,3.3333923 3.32555846,2.92768786 3.783,2.826 Z M12,20.597 L17.219,17.117 C18.3313648,16.3753273 18.9996429,15.1269494 19,13.79 L19,4.604 L12,3.05 L12,20.597 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

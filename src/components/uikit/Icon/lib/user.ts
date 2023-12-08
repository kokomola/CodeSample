export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Account@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Account" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M4,22 C4,17.581722 7.581722,14 12,14 C16.418278,14 20,17.581722 20,22 L18,22 C18,18.6862915 15.3137085,16 12,16 C8.6862915,16 6,18.6862915 6,22 L4,22 L4,22 Z M12,13 C8.685,13 6,10.315 6,7 C6,3.685 8.685,1 12,1 C15.315,1 18,3.685 18,7 C18,10.315 15.315,13 12,13 Z M12,11 C14.21,11 16,9.21 16,7 C16,4.79 14.21,3 12,3 C9.79,3 8,4.79 8,7 C8,9.21 9.79,11 12,11 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

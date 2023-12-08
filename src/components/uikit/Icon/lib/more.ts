export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / More@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-More" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M12,3 C11.175,3 10.5,3.675 10.5,4.5 C10.5,5.325 11.175,6 12,6 C12.825,6 13.5,5.325 13.5,4.5 C13.5,3.675 12.825,3 12,3 Z M12,18 C11.175,18 10.5,18.675 10.5,19.5 C10.5,20.325 11.175,21 12,21 C12.825,21 13.5,20.325 13.5,19.5 C13.5,18.675 12.825,18 12,18 Z M12,10.5 C11.175,10.5 10.5,11.175 10.5,12 C10.5,12.825 11.175,13.5 12,13.5 C12.825,13.5 13.5,12.825 13.5,12 C13.5,11.175 12.825,10.5 12,10.5 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

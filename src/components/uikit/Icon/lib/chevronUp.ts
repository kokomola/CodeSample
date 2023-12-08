export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Chevron up@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Chevron-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M12,10.828 L7.40355339,15.4244466 C7.20829124,15.6197088 6.89170876,15.6197088 6.69644661,15.4244466 L5.98955339,14.7175534 C5.79429124,14.5222912 5.79429124,14.2057088 5.98955339,14.0104466 L11.6464466,8.35355339 C11.8417088,8.15829124 12.1582912,8.15829124 12.3535534,8.35355339 L18.0104466,14.0104466 C18.2057088,14.2057088 18.2057088,14.5222912 18.0104466,14.7175534 L17.3035534,15.4244466 C17.1082912,15.6197088 16.7917088,15.6197088 16.5964466,15.4244466 L12,10.828 L12,10.828 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

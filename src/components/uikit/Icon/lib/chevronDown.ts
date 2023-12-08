export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Chevron down@1x</title>
      <desc>Created with Sketch.</desc>
      <defs>
          <path d="M9.35580254,16.9458025 C9.15929822,16.7492982 9.1523848,16.4372825 9.35938492,16.2298304 L13.58,12 L9.35938492,7.7701696 C9.16090211,7.57125342 9.16174493,7.24825507 9.35580254,7.05419746 L10.0541975,6.35580254 C10.2507018,6.15929822 10.5704855,6.16048551 10.7673589,6.35735893 L16.0526411,11.6426411 C16.250005,11.840005 16.2495145,12.1604855 16.0526411,12.3573589 L10.7673589,17.6426411 C10.569995,17.840005 10.2482551,17.8382551 10.0541975,17.6441975 L9.35580254,16.9458025 Z" id="path-1"></path>
      </defs>
      <g id="Icon-/-Chevron-down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <mask id="mask-2" fill="white">
              <use xlink:href="#path-1"></use>
          </mask>
          <use id="Shape" fill="${color}" transform="translate(12.500000, 12.000000) scale(1, -1) rotate(-90.000000) translate(-12.500000, -12.000000) " xlink:href="#path-1"></use>
      </g>
  </svg>
`;

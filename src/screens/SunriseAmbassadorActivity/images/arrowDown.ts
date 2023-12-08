export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="12px" height="8px" viewBox="0 0 12 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g fill="${color}">
              <polygon id="Triangle" transform="translate(6.000000, 4.000000) rotate(180.000000) translate(-6.000000, -4.000000) " points="6 0 12 8 0 8"></polygon>
          </g>
      </g>
  </svg>
`;

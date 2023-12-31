export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20">
  <g fill="none" fill-rule="evenodd">
      <g>
          <g>
              <g>
                  <path d="M0 0L24 0 24 24 0 24z" transform="translate(-337.000000, -993.000000) translate(320.000000, 976.000000) translate(16.000000, 16.000000)"/>
                  <path fill="${color}" d="M2.8 5.2L7 8l4.186-5.86c.188-.263.49-.42.814-.42.323 0 .626.157.814.42L17 8l4.2-2.8c.325-.216.745-.224 1.077-.02.332.204.516.583.47.97l-1.643 13.967c-.06.503-.486.883-.993.883H3.889c-.507 0-.934-.38-.993-.883L1.253 6.149c-.045-.387.138-.765.47-.969.332-.203.753-.196 1.077.02zM12 15c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" transform="translate(-337.000000, -993.000000) translate(320.000000, 976.000000) translate(16.000000, 16.000000)"/>
              </g>
          </g>
      </g>
  </g>
</svg>
`;

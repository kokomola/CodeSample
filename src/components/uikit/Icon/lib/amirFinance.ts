export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7419_11996)">
<path d="M13.8274 7.60567H19.1725L16.5 3H11.1637L7.16816 9.90853L0.5 21.4139H5.82745L8.49117 16.8082H24.5L21.8363 12.2026H11.1549L13.8274 7.60567Z" fill="${color}"/>
</g>
<defs>
<clipPath id="clip0_7419_11996">
<rect width="24" height="24" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>
`;

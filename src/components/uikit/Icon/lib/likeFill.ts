export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
          <g>
              <g>
                  <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.126 8.138c-.195.195-.512.195-.707 0L3.52 12.993c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z" transform="translate(-1342 -104) translate(1326 92) translate(16 12)"/>
                  <path fill="${color}" d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.126 8.138c-.195.195-.512.195-.707 0L3.52 12.993c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z" transform="translate(-1342 -104) translate(1326 92) translate(16 12)"/>
              </g>
          </g>
      </g>
  </svg>
`;

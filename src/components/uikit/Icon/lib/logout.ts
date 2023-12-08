export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fill-rule="evenodd">
        <g>
            <g>
                <path d="M0 0L24 0 24 24 0 24z" transform="translate(-16 -143) translate(16 143)"/>
                <path fill="${color}" d="M7.412 5.446c-2.86 2.002-4.092 5.629-3.042 8.959C5.42 17.735 8.508 20 12 20s6.58-2.265 7.63-5.595c1.05-3.33-.182-6.957-3.042-8.959l1.147-1.639C20.41 5.677 22.002 8.737 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12c-.002-3.264 1.59-6.323 4.265-8.193l1.147 1.639zM11 11.5v-9c0-.276.224-.5.5-.5h1c.276 0 .5.224.5.5v9c0 .276-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5z" transform="translate(-16 -143) translate(16 143)"/>
            </g>
        </g>
    </g>
  </svg>
`;

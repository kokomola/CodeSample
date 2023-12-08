export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: #FFFFFF;">
    <g fill="none" fill-rule="evenodd">
        <g>
            <g>
                <path d="M0 0L24 0 24 24 0 24z" transform="translate(-16 -192) translate(16 192)"/>
                <path fill="${color}" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333C8.723 17.574 8.152 15.31 8.027 13H4.062c.398 3.144 2.612 5.758 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752 1.152-2.075 1.825-4.383 1.97-6.752h-3.94zm9.908 0h-3.965c-.125 2.31-.696 4.574-1.683 6.667 3.036-.909 5.25-3.523 5.648-6.667zM4.062 11h3.965c.125-2.31.696-4.574 1.683-6.667C6.674 5.242 4.46 7.856 4.062 11zm5.969 0h3.938c-.144-2.37-.817-4.676-1.969-6.752-1.152 2.075-1.825 4.383-1.97 6.752h.001zm4.259-6.667c.987 2.093 1.558 4.357 1.683 6.667h3.965c-.398-3.144-2.612-5.758-5.648-6.667z" transform="translate(-16 -192) translate(16 192)"/>
            </g>
        </g>
    </g>
  </svg>
`;
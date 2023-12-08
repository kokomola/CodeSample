export default ({ color }: { color: string }): string => `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fill-rule="evenodd">
        <g>
            <g>
                <g>
                    <path d="M0 0L24 0 24 24 0 24z" transform="translate(-26 -350) translate(16 340) translate(10 10)"/>
                    <path fill="${color}" d="M9.366 10.682c.938 1.648 2.304 3.014 3.952 3.952l.884-1.238c.294-.412.85-.54 1.294-.296 1.414.773 2.976 1.238 4.583 1.364.52.041.921.475.921.997v4.462c0 .513-.388.943-.898.995-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602.052-.51.482-.898.995-.898h4.462c.522 0 .956.4.997.921.126 1.607.591 3.169 1.364 4.583.243.444.116 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357c-.54-1.164-.909-2.4-1.097-3.668H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637c-1.269-.188-2.504-.558-3.668-1.097l-1.357 1.9c-.546-.212-1.077-.463-1.588-.75l-.058-.033c-1.961-1.116-3.586-2.74-4.702-4.702l-.033-.058c-.287-.511-.538-1.042-.75-1.588z" transform="translate(-26 -350) translate(16 340) translate(10 10)"/>
                </g>
            </g>
        </g>
    </g>
  </svg>
`;

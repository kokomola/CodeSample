export default ({
  color,
}: {
  color: string;
}): string => `<svg xmlns="http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" >
    <g fill="none" fill-rule="evenodd">
        <g>
            <g>
                <g>
                    <path d="M0 0L24 0 24 24 0 24z" transform="translate(-24 -255) translate(14 245) translate(10 10)"/>
                    <g fill=${color} fill-rule="nonzero">
                        <path d="M16 8h1c.265 0 .52.105.707.293.188.187.293.442.293.707v10c0 .265-.105.52-.293.707-.187.188-.442.293-.707.293H1c-.265 0-.52-.105-.707-.293C.105 19.52 0 19.265 0 19V9c0-.265.105-.52.293-.707C.48 8.105.735 8 1 8h1V7c0-.92.181-1.83.533-2.679.352-.85.867-1.62 1.517-2.27C4.7 1.4 5.472.884 6.321.532 7.171.18 8.081 0 9 0c.92 0 1.83.181 2.679.533.85.352 1.62.867 2.27 1.517.65.65 1.166 1.422 1.518 2.271.352.85.533 1.76.533 2.679v1zM2 10v8h14v-8H2zm6.5 2h1c.276 0 .5.224.5.5v3c0 .276-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5zM14 8V7c0-1.326-.527-2.598-1.464-3.536C11.598 2.527 10.326 2 9 2s-2.598.527-3.536 1.464C4.527 4.402 4 5.674 4 7v1h10z" transform="translate(-24 -255) translate(14 245) translate(10 10) translate(3 2)"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>`;

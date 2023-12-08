export default ({ color }: { color: string }): string => `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<g fill="none" fill-rule="evenodd">
    <g>
        <g>
            <path d="M0 0L24 0 24 24 0 24z" transform="translate(-176 -175) translate(176 175)"/>
            <path fill="${color}" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm-5-4h2c0-1.657 1.343-3 3-3s3 1.343 3 3h2c0-2.761-2.239-5-5-5s-5 2.239-5 5z" transform="translate(-176 -175) translate(176 175)"/>
        </g>
    </g>
</g>
</svg>
`;

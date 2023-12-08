export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Check@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Check" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M10,15.172 L18.8384658,6.33257262 C19.0337818,6.13744691 19.3502828,6.13738236 19.5456783,6.33242839 L20.2533217,7.03957161 C20.4487777,7.23463972 20.4488896,7.55122219 20.2536965,7.74655335 C20.2536549,7.74659502 20.2536132,7.74663668 20.2534466,7.74655339 L10.3535534,17.6464466 C10.1582912,17.8417088 9.84170876,17.8417088 9.64644661,17.6464466 L3.98955339,11.9895534 C3.79429124,11.7942912 3.79429124,11.4777088 3.98955339,11.2824466 L4.69644661,10.5755534 C4.89170876,10.3802912 5.20829124,10.3802912 5.40355339,10.5755534 L10,15.172 L10,15.172 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

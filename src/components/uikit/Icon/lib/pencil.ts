export default ({ color }: { color: string }): string => `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
      <title>Icon / Edit@1x</title>
      <desc>Created with Sketch.</desc>
      <g id="Icon-/-Edit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Canvas" points="0 0 24 0 24 24 0 24"></polygon>
          <path d="M6.243,18 L3.5,18 C3.22385763,18 3,17.7761424 3,17.5 L3,14.757 L3,14.757 L14.435,3.322 C14.8254999,2.93161806 15.4585001,2.93161806 15.849,3.322 L17.678,5.151 C18.0683819,5.54149985 18.0683819,6.17450015 17.678,6.565 L6.243,18 Z M3.5,20 L20.5,20 C20.7761424,20 21,20.2238576 21,20.5 L21,21.5 C21,21.7761424 20.7761424,22 20.5,22 L3.5,22 C3.22385763,22 3,21.7761424 3,21.5 L3,20.5 C3,20.2238576 3.22385763,20 3.5,20 Z" id="Shape" fill="${color}"></path>
      </g>
  </svg>
`;

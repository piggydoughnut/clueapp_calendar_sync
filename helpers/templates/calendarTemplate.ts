// wysiwig editor https://mjml.io/try-it-live/WrtjeUtsh
// documentation

import mjml2html from "mjml";

const htmlOutput = mjml2html(
  `
<mjml>
<mj-body>
      <mj-section full-width="full-width" background-color="#FDF5ED">
    <mj-column>
      <mj-text font-size="18px" align="center">Hack Your Cycle</mj-text>
    </mj-column>
  </mj-section>
  <mj-section>
    <mj-column>
      <mj-text font-size="20px" color="#000" font-family="helvetica">Hello there!</mj-text>
      <mj-text font-size="18px" color="#000" font-family="helvetica">Great to hear that you want to learn more about your cycle and make it work for you!</mj-text>
      <mj-text font-size="18px">Here is your personalized Cycle Calendar.</mj-text>
      <mj-image width="350px" padding-top="50px" padding-bottom="50px" src="{{ imageUrl }}"></mj-image>
      <mj-button font-family="Helvetica" background-color="#7A7CE1" color="white" href="{{ imageUrl }}" font-size="20px" width="300px">Download the calendar</mj-button>
    </mj-column>
  </mj-section>

  <mj-section full-width="full-width" background-color="#FDF5ED">
    <mj-column>
      <mj-text font-size="18px" align="center">Much love from Daria, Hack Your Cycle Team</mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
`,
  {}
);

export function interpolateTemplate(template, vars) {
  // Interpolate variables.
  let res = "";
  for (const prop in vars) {
    res = template.html.replaceAll(`{{ ${prop} }}`, vars[prop]);
  }
  return { ...template, html: res };
}

export function getCalendarTemplate(imageUrl) {
  return interpolateTemplate(htmlOutput, {
    imageUrl,
  }).html;
}

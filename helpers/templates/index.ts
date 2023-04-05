// wysiwig editor https://mjml.io/try-it-live/fy6JT1Cvo
// documentation

import calendar from "./calendar";
import confirmation from "./confirmation";
import feedback from "./feedback";
import mjml2html from "mjml";

export const TemplateName = {
  FEEDBACK: "feedback",
  CONFIRMATION: "confirmation",
  CALENDAR: "calendar",
};

const templates = {
  [TemplateName.FEEDBACK]: feedback,
  [TemplateName.CONFIRMATION]: confirmation,
  [TemplateName.CALENDAR]: calendar,
};

export function getTemplate(vars = {}, templateName: string) {
  let html;
  const template = templates[templateName];
  const mjml = template(vars);
  console.log(vars);
  html = mjml2html(mjml);
  return html.html;
}

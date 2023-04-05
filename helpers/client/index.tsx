export const scrollToDiv = (document, target) => {
  document.getElementById(target).scrollIntoView({ behavior: "smooth" });
};

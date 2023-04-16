export const scrollToDiv = (document: Document, target: string) => {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
};

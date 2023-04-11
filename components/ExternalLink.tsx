export const ExternalLink = (href: string, title: string) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className="underline"
    href={href}
  >
    {title}
  </a>
);

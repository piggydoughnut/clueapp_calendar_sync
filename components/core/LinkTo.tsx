import Link from "next/link";

export const LinkTo = ({ url, name }: { url: string; name: string }) => (
  <Link
    className="text-indigo-800 hover:text-indigo-400 transition-all hover:ease-in-out pt-8"
    href={url}
  >
    {name}
  </Link>
);

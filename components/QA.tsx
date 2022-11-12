export default function QA({
  title,
  children,
  idx,
}: {
  title: string;
  children: any;
  idx: number;
}) {
  return (
    <div className="mx-auto">
      <h2
        className={`p-4 pl-16 pr-16 ${
          idx % 2 === 0 ? "bg-indigo-50" : "bg-red-50"
        } text-lg font-bold uppercase`}
      >
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

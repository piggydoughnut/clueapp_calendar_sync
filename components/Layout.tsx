const Navbar = () => <div></div>;
const Footer = () => <div></div>;

export default function Layout({
  bgImage = "bg-[url('/heart.svg')] bg-center bg-lightPink",
  children,
}) {
  return (
    <div className={`bg-no-repeat h-screen ${bgImage}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

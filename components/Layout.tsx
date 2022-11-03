const Navbar = () => <div></div>;
const Footer = () => <div></div>;

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

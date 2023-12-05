import Image from "next/image";
export const GoogleButton = ({ ...props }) => {
  return (
    <button {...props}>
      <Image
        src="/web_light_rd_SI.svg"
        alt="google button"
        height="40"
        width="200"
        className="hover:scale-105 hover:opacity-80 delay-100 transition-all"
      ></Image>
    </button>
  );
};

export default GoogleButton;

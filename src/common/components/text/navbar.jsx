export const NavbarText = ({ title, active }) => {
  return (
    <div
      className={`text-[.6rem] font-noto ${
        active === title
          ? "text-primary dark:text-primaryD"
          : "text-jwBlack dark:text-white"
      }`}
    >
      {title}
    </div>
  );
};

export const NavbarIcon = ({ children, title, setActive }) => {
  return (
    <div>
      <div
        className="md:h-navW flex flex-col items-center justify-center gap-1 landscape:flex-row "
        onClick={() => {
          setActive(title);
        }}
      >
        {children}
      </div>
    </div>
  );
};

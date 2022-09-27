export const Navbar = ({ children }) => {
  return (
    <>
      <div
        className="
          fixed bottom-0 z-50 flex h-navHeight w-full items-end justify-around border-t border-bgDark bg-bg
          dark:border-bgDarkD dark:bg-bgD
          landscape:h-10 landscape:items-center "
      >
        {children}
      </div>
    </>
  );
};

// md:h-screen md:w-navW md:flex-col md:items-center md:justify-start md:border-r md:border-t-0 landscape:md:h-screen 

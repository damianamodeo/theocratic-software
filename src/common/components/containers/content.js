export const Content = ({ children, bgColor }) => {
  const styles = "fixed h-screen w-screen " + bgColor;

  return (
    <>
      <div className={styles}></div>
      <div
        className="
          landscape:m d:bottom-0 absolute inset-y-navW inset-x-0 overflow-auto
          overscroll-y-contain px-2 md:left-navW
          md:right-0 md:bottom-0 landscape:bottom-10 "
      >
        {children}
      </div>
    </>
  );
};

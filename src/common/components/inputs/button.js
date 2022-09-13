export const Button = ({ action, children }) => {
  return (
    <div
      className="m-auto w-56 bg-button p-2 text-center font-noto text-white dark:bg-buttonD dark:text-black"
      onClick={action}
    >
      {children}
    </div>
  );
};

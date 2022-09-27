export const Card = ({ action, children }) => {
  return (
    <div
      className="
        m-1
        grid
        bg-white 
        p-2
        dark:bg-bgGrey
      "
      onClick={action}
    >
      {children}
    </div>
  );
};
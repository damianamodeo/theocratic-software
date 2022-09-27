import { DefaultText } from "../text/text";

export const Accordion = ({ title, children, active, setActive }) => {
  return (
    <div className={"grid content-center text-center p-3"}>
      <div onClick={() => setActive(active == title ? "" : title)}
      className={`${active === title ? "bg-bg" : ""}`} >
        <DefaultText>
          <span className="text-lg">{title}</span>
        </DefaultText>
      </div>
      <div className={active === title ? "visible" : "hidden"}>{children}</div>
    </div>
  );
};

import { style } from "./style";

export const NumberInput = ({ label, value, action }) => {
  return (
    <>
      <div className="relative">
        <input
          type="tel"
          id={label}
          className={style.input}
          placeholder=" "
          value={value}
          onChange={action}
        />
        <label
          htmlFor={label}
          className={style.label}
        >
          {label}
        </label>
      </div>
    </>
  );
};
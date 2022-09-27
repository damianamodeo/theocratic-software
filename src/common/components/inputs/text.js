import { style } from "./style";

export const TextInput = ({ label, value, action }) => {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          className={style.input}
          placeholder=" "
          value={value}
          autoComplete="off"
          onChange={action}
          id={label}
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
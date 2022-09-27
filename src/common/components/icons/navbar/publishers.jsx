import { NavbarIcon } from "common/components/containers/navbar-icon";
import { NavbarText } from "common/components/text/navbar";
import { style } from "common/styles/navbar-icons";

export const PublishersIcon = ({ title, active, setActive }) => {
  return (
    <NavbarIcon title={title} setActive={setActive}>
      <svg viewBox="0 0 32 32" className={`fill-none  h-6 w-6`}>
        <g className={active === title ? style.active : style.inactive}>
          <circle cx="8" cy="6" r="2.5" />
          <circle cx="17" cy="4" r="2.5" />
          <circle cx="26" cy="5.9" r="2.5" />
          <path d="m5.5 30.6 24-.1v-9.9s1-.3 1-1v-6.2s.5-3-2.2-3l-7 .1s-.4-2-2.5-2h-4.2s-2.2-.3-2.2 2H5.8s-2.3.2-2.3 2.4v7.5l-2 .1v3h4z" />
        </g>
        <g
          fill="none"
          strokeWidth="1.1"
          className={active === title ? style.active : style.inactive}
        >
          <circle cx="8" cy="6" r="2.5" />
          <circle cx="17" cy="4" r="2.5" />
          <circle cx="26" cy="5.9" r="2.5" />
          <path d="M5.5 25.5v5M8.5 23.5v7M14.5 24.4v6.2M17.5 21.5v9M26.5 23.5v6.9M29.5 30.5v-9.9s1-.2 1-1.2v-6s.6-3-2.4-3h-4.7M22.4 23.5H24s.5 0 .5-.5v-2s0-.6-.5-.6h-1.7" />
          <rect width="4" height="3" x="1.5" y="20.5" rx=".3" ry=".3" />
          <rect width="4" height="3" x="10.5" y="19.5" rx=".3" ry=".3" />
          <path d="M20.5 30.5v-11s1 .2 1-1v-7.2s0-2.8-2.9-2.8H15s-2.5.1-2.5 2.5-.5 8.5-.5 8.5M10.4 10.5H5.7s-2.1.1-2.2 2.6v7.3" />
        </g>
      </svg>
      <NavbarText title={title} active={active}/>
    </NavbarIcon>
  );
};

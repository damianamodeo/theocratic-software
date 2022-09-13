import { useEffect } from "react";

export const Menubar = ({ items }) => {
  const select = (e) => {
    let menuItems = document.querySelectorAll(".item");
    menuItems.forEach((item) =>
      item.classList.remove("font-extrabold", "text-primary")
    );
    e.target.classList.add("font-extrabold", "text-primary");
    let marker = document.querySelector("#marker");
    marker.style.left = e.target.offsetLeft + "px";
    marker.style.width = e.target.offsetWidth + "px";
  };

  useEffect(() => {
    const changeScroll = (e) => {
      e.preventDefault();
      menu.scrollLeft += e.deltaY / 20;
    };

    const menu = document.querySelector(".menuBar");
    menu.addEventListener("wheel", changeScroll);

    return () => {};
  });

  return (
    <>
      <div
        className="
          menuBar fixed top-navW z-40 flex h-10
          w-full touch-auto content-center
          overflow-x-auto overflow-y-hidden border
          border-y-bgDark bg-white px-2 pr-8 md:left-navW "
      >
        <div
          id="marker"
          className="absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300 "
        ></div>

        {items?.map((item) => (
          <div key={item.id} className="m-2">
            <div className={`item relative`} onClick={(e) => select(e)}>
              {item.label}
            </div>
            <div className="-z-1 invisible font-extrabold">{item.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

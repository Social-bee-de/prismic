"use client";

interface Props {
  children: string | JSX.Element | JSX.Element[],
  className?: string,
  elementId?: string,
}

export const ScrollABit = (props: Props) => {
  const handleScroll = () => {
    const el = document.getElementById(props.elementId ?? '');
    el?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <button onClick={handleScroll} className={props.className ?? "button-bold flex flex-row items-center h-16 gap-3"}>
      {props.children}
    </button>
  );
}

import { useRef } from "react";

const Tracks = () => {
  const tracksBar = useRef(null);
  return (
    <>
      <div
        ref={tracksBar}
        className="absolute bottom-0 top-0 z-[1001] w-40 max-w-16 bg-surface0"
      ></div>
    </>
  );
};

export default Tracks;

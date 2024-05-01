import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type Props = { fileUrl: string };

const AlphatabContainer: React.FC<Props> = ({ fileUrl }) => {
  const alphatabContainer = useRef(null);
  const alphatabControls = useRef(null);
  const alphatabSidebar = useRef(null);

  useEffect(() => {
    const container = alphatabContainer.current;

    const settings = {
      file: fileUrl,
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: "/alphatab/soundfont/sonivox.sf2",
        scrollElement: container,
      },
      display: {
        resources: {
          scoreInfoColor: "#cdd6f4",
          mainGlyphColor: "#cdd6f4",
          secondaryGlyphColor: "#cdd6f4",
          staffLineColor: "#9399b2",
          barSeparatorColor: "#cdd6f4",
          barNumberColor: "#cdd6f4",
          tablatureFont: "bold 14px Arial, sans-serif",
        },
      },
    };
    const alphaTabApi = new alphaTab.AlphaTabApi(container, settings);

    return () => {
      alphaTabApi.destroy();
    };
  }, [fileUrl]);

  return (
    <>
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="relative flex flex-1 overflow-hidden">
          <div
            ref={alphatabSidebar}
            className="absolute bottom-0 top-0 z-[1001] w-40 max-w-16 bg-surface0"
          ></div>
          <div
            ref={alphatabContainer}
            className="ml-12 w-screen overflow-x-hidden"
          ></div>
        </div>
        <div
          ref={alphatabControls}
          className="p-3 flex h-10 w-full items-center justify-between bg-surface0 text-text"
        >
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <select name="zoom" id="zoom">
              <option value="75">75</option>
              <option value="100">100</option>
              <option value="150">150</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
export default AlphatabContainer;

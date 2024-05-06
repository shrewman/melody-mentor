import { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import Tracks from "./Tracks";

type Props = { fileUrl: string };

const AlphatabContainer: React.FC<Props> = (props) => {
  const alphatabContainer = useRef(null);
  const scrollElement = useRef(null);
  const api = useRef<any>(null);
  const [score, setScore] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string>(props.fileUrl);

  useEffect(() => {
    const container = alphatabContainer.current;

    const settings = {
      file: fileUrl,
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: "/alphatab/soundfont/sonivox.sf2",
        scrollElement: scrollElement.current,
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

    api.current = new alphaTab.AlphaTabApi(container, settings);

    api.current.scoreLoaded.on((score) => {
      setScore(score);
    });

    return () => {
      api.current.destroy();
    };
  }, [fileUrl]);

  const renderFile = (file: File) => {
    setFileUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="relative flex flex-1 overflow-hidden">
          {score?.tracks.length > 1 && <Tracks api={api} tracks={score.tracks}></Tracks>}
          <div ref={scrollElement} className="ml-12 w-screen overflow-x-hidden">
            <div ref={alphatabContainer}></div>
          </div>
        </div>
        <Controls api={api} renderFile={renderFile}></Controls>
      </div>
    </>
  );
};
export default AlphatabContainer;

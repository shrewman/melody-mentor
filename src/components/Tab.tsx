import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Tab = () => {
  const { fileName } = useParams<{ fileName: string }>();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const alphatabContainer = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/songs/${fileName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch file");
        }
        return res.blob();
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        setFileUrl(blobUrl);
      })
      .catch((err) => console.error("error: ", err));
  }, [fileName]);

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
          scoreInfoColor: '#cdd6f4',
          mainGlyphColor: '#cdd6f4',
          secondaryGlyphColor: '#cdd6f4',
          staffLineColor: '#9399b2',
          barSeparatorColor: '#cdd6f4',
          barNumberColor: '#cdd6f4',
          tablatureFont: 'bold 14px Arial, sans-serif',
        }
      },
    };
    const alphaTabApi = new alphaTab.AlphaTabApi(container, settings);
    return () => {
      alphaTabApi.destroy();
    }
  }, [fileUrl]);

  return (
    <>
      <div ref={alphatabContainer}></div>
    </>
  );
};

export default Tab;

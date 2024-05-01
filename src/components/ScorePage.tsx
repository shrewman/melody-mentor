import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AlphatabContainer from "./AlphatabContainer";

const ScorePage = () => {
  const { fileName } = useParams<{ fileName: string }>();
  const [fileUrl, setFileUrl] = useState<string | null>(null);

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

  return (
    <>
      {fileUrl ? (
        <AlphatabContainer fileUrl={fileUrl}></AlphatabContainer>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ScorePage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Tab = () => {
  const { fileName } = useParams<{ fileName: string }>();
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/songs/${fileName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch file");
        }
        return res.text();
      })
      .then((data) => {
        setFile(data);
      })
      .catch((err) => console.error("error: ", err));
  }, [fileName]);

  return (
    <>
      <div>{fileName}</div>
      <div>{file}</div>
    </>
  );
};

export default Tab;

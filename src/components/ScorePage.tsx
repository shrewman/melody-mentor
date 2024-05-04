import { useParams } from "react-router-dom";
import AlphatabContainer from "./alphatab-container/AlphatabContainer";
import { useQuery } from "@tanstack/react-query";

const ScorePage = () => {
  const { fileName } = useParams<{ fileName: string }>();

  const fetchFile = async () => {
    const res = await fetch(`http://localhost:3000/api/v1/songs/${fileName}`);
    if (!res.ok) {
      throw new Error("Failed to fetch file");
    }
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["file"],
    queryFn: fetchFile,
  });

  return (
    <>
      {data && <AlphatabContainer fileUrl={data}></AlphatabContainer>}
      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default ScorePage;

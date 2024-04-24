import { Complexity } from "../types";

type Props = {
  complexity: Complexity;
};

const ComplexityBar: React.FC<Props> = ({ complexity }) => {
  function getBarColor(complexity: Complexity) {
    switch (complexity) {
      case "VERY EASY":
        return "bg-blue";
      case "EASY":
        return "bg-green";
      case "MEDIUM":
        return "bg-yellow";
      case "HARD":
        return "bg-peach";
      case "VERY HARD":
        return "bg-red";
      default:
        return "bg-base";
    }
  }

  function getBarWidth(complexity: Complexity) {
    switch (complexity) {
      case "VERY EASY":
        return "w-1/12";
      case "EASY":
        return "w-3/12";
      case "MEDIUM":
        return "w-6/12";
      case "HARD":
        return "w-9/12";
      case "VERY HARD":
        return "w-full";
      default:
        return "w-1/2";
    }
  }
  return (
    <>
      <div className="mt-2 flex items-center">
        <span className="mr-2">Complexity:</span>
        <div className="flex h-4 w-32 overflow-hidden rounded-full bg-base">
          <div
            className={`${getBarColor(complexity)} ${getBarWidth(complexity)}`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ComplexityBar;

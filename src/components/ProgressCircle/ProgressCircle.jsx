import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

export function Progress(props) {
  return (
    <CircularProgressbarWithChildren
      value={props.precentage}
      styles={buildStyles({
        pathColor: `rgba(1,210,119)`,
        trailColor: `rgba(155,155,155,0.3)`,
        trailColor: "",
        trailColor: "#343e44",
      })}
    />
  );
}

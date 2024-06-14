import { useChartsContext } from "@/context/charts-context";

export const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  const { selectedLabel, selectedValues } = useChartsContext();

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const { payload: payloadData } = payload[0];

  return (
    <div className="rounded-lg border bg-white px-4 py-2">
      <p className="text-center font-bold">{payloadData[selectedLabel]}</p>
      {selectedValues.map((value, index) => (
        <p key={index} style={{ color: payload[index]?.payload.fill }}>
          {`${value} : ${payloadData[value]}`}
        </p>
      ))}
    </div>
  );
};

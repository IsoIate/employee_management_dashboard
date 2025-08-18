import { TravelItem } from "../types/travel";

interface Props {
  travel: TravelItem;
}

export default function TravelCard({ travel }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{travel.title}</h2>
      <p className="text-gray-700 mb-2">{travel.description}</p>
      <p className="text-gray-500 text-sm">{travel.date}</p>
    </div>
  );
}

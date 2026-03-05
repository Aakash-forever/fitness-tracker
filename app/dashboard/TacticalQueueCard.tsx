import Card from "@/components/ui/Card";
import type { QueueItem } from "./types";

type TacticalQueueCardProps = {
  items: QueueItem[];
};

export default function TacticalQueueCard({ items }: TacticalQueueCardProps) {
  return (
    <Card title="Tactical Queue">
      <div className="space-y-4 text-sm">
        {items.map((item) => (
          <div
            key={item.name}
            className="
              flex justify-between items-center
              bg-[#161B22]
              px-4 py-3 rounded-lg
              border border-white/5
              hover:border-[#F59E0B]/40
              transition-all duration-300
            "
          >
            <span>{item.name}</span>
            <span className="text-[#F59E0B]">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

import type { Status } from "@/types/claims";

const CONFIG: Record<Status, { label: string; className: string }> = {
  OPEN: { label: "Open", className: "bg-amber-100 text-amber-800 border border-amber-200" },
  UNDER_REVIEW: {
    label: "Under review",
    className: "bg-blue-100 text-blue-800 border border-blue-200",
  },
  IN_REPAIR: {
    label: "In repair",
    className: "bg-violet-100 text-violet-800 border border-violet-200",
  },
  CLOSED: {
    label: "Closed",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  },
};

export default function StatusBadge({ status }: { status: Status }) {
  const cfg = CONFIG[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-700 border border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

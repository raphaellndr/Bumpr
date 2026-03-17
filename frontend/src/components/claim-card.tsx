import { Link } from "react-router-dom";
import { claimsApi } from "@/api/claims";
import type { Claim } from "@/types/claims";
import StatusBadge from "./status-badge";

interface Props {
  claim: Claim;
  onUpdate: () => void;
}

export default function ClaimCard({ claim, onUpdate }: Props) {
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await claimsApi.update(claim.id, { status: e.target.value as Claim["status"] });
    onUpdate();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this claim?")) return;
    await claimsApi.delete(claim.id);
    onUpdate();
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900">{claim.driverName}</h3>
          <p className="mt-0.5 text-sm text-gray-500">{claim.vehicle}</p>
        </div>
        <StatusBadge status={claim.status} />
      </div>

      <p className="mb-2 font-mono text-xs text-gray-400">{claim.policyNumber}</p>

      {claim.description && (
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{claim.description}</p>
      )}

      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="flex items-center gap-3">
          {claim.estimatedAmount && (
            <span className="text-sm font-semibold text-gray-800">
              {claim.estimatedAmount.toLocaleString("fr-FR")} EUR
            </span>
          )}
          <span className="text-xs text-gray-400">Expert #{claim.expertId}</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={claim.status}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="OPEN">Open</option>
            <option value="UNDER_REVIEW">Under review</option>
            <option value="IN_REPAIR">In repair</option>
            <option value="CLOSED">Closed</option>
          </select>

          <Link
            to={`/claims/${claim.id}`}
            className="rounded-lg px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
          >
            Details
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg px-2 py-1 text-xs text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

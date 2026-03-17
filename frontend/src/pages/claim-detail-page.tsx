import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { claimsApi } from "@/api/claims";
import StatusBadge from "@/components/status-badge";
import type { Claim } from "@/types/claims";

export default function ClaimDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    claimsApi
      .getById(Number(id))
      .then(setClaim)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!claim || !confirm("Delete this claim?")) return;
    await claimsApi.delete(claim.id);
    navigate("/");
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!claim) return;
    const updated = await claimsApi.update(claim.id, {
      status: e.target.value as Claim["status"],
    });
    setClaim(updated);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-400">
        Loading...
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-500">Claim not found.</p>
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          Back to claims
        </Link>
      </div>
    );
  }

  const details = [
    { label: "Policy number", value: claim.policyNumber },
    {
      label: "Estimated amount",
      value: claim.estimatedAmount ? `${claim.estimatedAmount.toLocaleString("fr-FR")} EUR` : "-",
    },
    { label: "Created", value: new Date(claim.createdAt).toLocaleDateString("en-GB") },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
          <Link to="/" className="text-sm text-gray-400 transition-colors hover:text-gray-600">
            Back
          </Link>
          <span className="text-gray-200">|</span>
          <span className="font-bold tracking-tight text-gray-900">Bumpr</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{claim.driverName}</h1>
              <p className="mt-1 text-gray-500">{claim.vehicle}</p>
            </div>
            <StatusBadge status={claim.status} />
          </div>

          <div className="mb-6 grid grid-cols-2 gap-6">
            {details.map(({ label, value }) => (
              <div key={label}>
                <p className="mb-1 text-xs font-medium tracking-wide text-gray-400 uppercase">
                  {label}
                </p>
                <p className="font-mono text-sm text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <p className="mb-2 text-xs font-medium tracking-wide text-gray-400 uppercase">
              Description
            </p>
            <p className="text-sm leading-relaxed text-gray-700">{claim.description}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">Status:</label>
              <select
                value={claim.status}
                onChange={handleStatusChange}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="OPEN">Open</option>
                <option value="UNDER_REVIEW">Under review</option>
                <option value="IN_REPAIR">In repair</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <button
              onClick={handleDelete}
              className="rounded-lg px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              Delete claim
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

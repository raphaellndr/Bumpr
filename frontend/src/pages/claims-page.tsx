import { useCallback, useEffect, useState } from "react";

import { claimsApi } from "@/api/claims";
import ClaimCard from "@/components/claim-card";
import ClaimForm from "@/components/claim-form";
import { Status, type Claim } from "@/types/claims";

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | undefined>(undefined);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  const fetchClaims = useCallback(async () => {
    try {
      setLoading(true);
      setClaims(await claimsApi.getAll(statusFilter, sortBy, order));
    } catch {
      setError("Failed to load claims.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, sortBy, order]);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-center justify-between py-4">
            <span className="text-lg font-bold tracking-tight text-gray-900">Bumpr</span>
            <span className="font-mono text-xs text-gray-400">
              {claims.length} claim{claims.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6">
          <ClaimForm onCreated={fetchClaims} />
        </div>

        {/* Filtres */}
        <div className="mb-4 flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All statuses</option>
            <option value="OPEN">Open</option>
            <option value="UNDER_REVIEW">Under review</option>
            <option value="IN_REPAIR">In repair</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">No sort</option>
            <option value="estimatedAmount">Amount</option>
            <option value="createdAt">Created at</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          {(statusFilter || sortBy) && (
            <button
              onClick={() => {
                setStatusFilter(undefined);
                setSortBy("");
                setOrder("asc");
              }}
              className="ml-auto text-xs text-gray-400 transition-colors hover:text-gray-600"
            >
              Reset
            </button>
          )}
        </div>

        {loading && <div className="py-16 text-center text-sm text-gray-400">Loading...</div>}
        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}
        {!loading && !error && claims.length === 0 && (
          <div className="py-16 text-center text-sm text-gray-400">No claims yet.</div>
        )}

        <div className="flex flex-col gap-3">
          {claims.map((c) => (
            <ClaimCard key={c.id} claim={c} onUpdate={fetchClaims} />
          ))}
        </div>
      </main>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";

import { claimsApi } from "@/api/claims";
import ClaimCard from "@/components/claim-card";
import ClaimForm from "@/components/claim-form";
import type { Claim } from "@/types/claims";

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClaims = useCallback(async () => {
    try {
      setLoading(true);
      setClaims(await claimsApi.getAll());
    } catch {
      setError("Failed to load claims.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight text-gray-900">Bumpr</span>
          <span className="font-mono text-xs text-gray-400">
            {claims.length} claim{claims.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6">
          <ClaimForm onCreated={fetchClaims} />
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

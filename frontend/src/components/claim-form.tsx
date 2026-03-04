import { useState } from "react";

import { claimsApi } from "@/api/claims";
import type { CreateClaimDTO } from "@/types/claims";

const EMPTY: CreateClaimDTO = {
  policyNumber: "",
  driverName: "",
  vehicle: "",
  accidentDate: "",
  description: "",
};

const FIELDS: { name: keyof CreateClaimDTO; label: string; type: string }[] = [
  { name: "driverName", label: "Driver name", type: "text" },
  { name: "vehicle", label: "Vehicle", type: "text" },
  { name: "policyNumber", label: "Policy number", type: "text" },
  { name: "accidentDate", label: "Accident date", type: "date" },
];

export default function ClaimForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState<CreateClaimDTO>(EMPTY);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await claimsApi.create(form);
      setForm(EMPTY);
      setOpen(false);
      onCreated();
    } catch {
      setError("Failed to create claim. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-400 transition-colors hover:border-blue-400 hover:text-blue-500"
      >
        + New claim
      </button>
    );
  }

  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">New claim</h2>
        <button
          onClick={() => setOpen(false)}
          className="text-xl leading-none text-gray-400 hover:text-gray-600"
        >
          x
        </button>
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          {FIELDS.map(({ name, label, type }) => (
            <div key={name}>
              <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name] ?? ""}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-xs font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create claim"}
          </button>
        </div>
      </form>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <p className="text-6xl font-bold text-gray-200">404</p>
      <p className="text-gray-500">Page not found.</p>
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        Back to claims
      </Link>
    </div>
  );
}

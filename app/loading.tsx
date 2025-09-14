export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-surface rounded-md w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-surface rounded-md w-96 animate-pulse"></div>
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card animate-pulse">
              <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
              <div className="h-64 bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-32 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoadMore({ shown, total, onMore, endMessage }) {
  if (shown < total) {
    return (
      <div className="mt-8 text-center">
        <button
          onClick={onMore}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors"
        >
          <i className="fas fa-chevron-down mr-2"></i>
          Load More ({total - shown} remaining)
        </button>
      </div>
    )
  }
  return (
    <div className="mt-8 text-center">
      <p className="text-gray-500 dark:text-gray-400 text-sm">{endMessage}</p>
    </div>
  )
}

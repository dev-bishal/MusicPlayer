import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SongRow from '../components/SongRow.jsx'
import LoadMore from '../components/LoadMore.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import { searchSongs } from '../lib/library.js'

const PAGE_SIZE = 8

export default function Songs() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const [shown, setShown] = useState(PAGE_SIZE)
  const { playQueue } = usePlayer()

  const filtered = useMemo(() => searchSongs(query), [query])
  useEffect(() => setShown(PAGE_SIZE), [query])

  const visible = filtered.slice(0, shown)

  const shuffleAll = () => {
    if (!filtered.length) return
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    playQueue(shuffled, 0)
  }

  return (
    <div>
      {/* Page actions */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={query}
              onChange={(e) =>
                setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })
              }
              placeholder="Search songs, artists, albums..."
              className="pl-12 pr-4 py-3 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={shuffleAll}
            className="px-4 md:px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <i className="fas fa-random"></i>
            <span>Shuffle All</span>
          </button>
          <button
            onClick={() => filtered.length && playQueue(filtered, 0)}
            className="px-4 md:px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <i className="fas fa-play"></i>
            <span>Play All</span>
          </button>
        </div>
      </div>

      {/* List header */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
        <div className="grid grid-cols-12 gap-4 px-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-8 md:col-span-6">Title</div>
          <div className="col-span-2 hidden md:block">Album</div>
          <div className="col-span-2 hidden md:block">Date Added</div>
          <div className="col-span-3 md:col-span-1 text-right">
            <i className="fas fa-clock"></i>
          </div>
        </div>
      </div>

      {/* Song list */}
      <div className="space-y-1">
        {visible.map((song, i) => (
          <SongRow key={song.id} song={song} indexInList={i} list={filtered} />
        ))}
        {!visible.length && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No songs match “{query}”.
          </p>
        )}
      </div>

      {filtered.length > 0 && (
        <LoadMore
          shown={shown}
          total={filtered.length}
          onMore={() => setShown(shown + PAGE_SIZE)}
          endMessage="You've reached the end of your library"
        />
      )}
    </div>
  )
}

import { usePlayer } from '../context/PlayerContext.jsx'
import { asset } from '../lib/library.js'

/**
 * One row in a song list. `list` is the full list this row belongs to so
 * clicking play loads that list as the queue starting at this song.
 */
export default function SongRow({ song, indexInList, list, showAlbum = true }) {
  const { current, isPlaying, playQueue, toggle, addToQueue, queue } = usePlayer()
  const isCurrent = current?.id === song.id
  const inQueue = queue.some((s) => s.id === song.id)

  const onPlay = () => {
    if (isCurrent) toggle()
    else playQueue(list, indexInList)
  }

  return (
    <div
      className={`song-item group grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px cursor-pointer ${
        isCurrent
          ? 'bg-indigo-50 dark:bg-indigo-900/20'
          : 'bg-white dark:bg-gray-800 hover:shadow-md'
      }`}
      onClick={onPlay}
    >
      <div className="col-span-1 text-center text-sm text-gray-500 dark:text-gray-400">
        {/* FA's own display rule beats Tailwind's layered `hidden` on <i>, so toggle wrapper spans instead */}
        <span className="group-hover:hidden">
          {isCurrent ? (
            <i
              className={`fas ${isPlaying ? 'fa-volume-up' : 'fa-pause'} text-indigo-600 dark:text-indigo-400`}
            ></i>
          ) : (
            indexInList + 1
          )}
        </span>
        <span className="hidden group-hover:inline text-indigo-600 dark:text-indigo-400">
          <i className={`fas ${isCurrent && isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </span>
      </div>

      <div className={`${showAlbum ? 'col-span-8 md:col-span-6' : 'col-span-8'} flex items-center min-w-0`}>
        <img
          src={asset(song.cover)}
          alt={song.title}
          className="w-10 h-10 rounded object-cover mr-3 shrink-0"
          loading="lazy"
        />
        <div className="min-w-0">
          <h4
            className={`font-medium truncate text-sm md:text-base ${
              isCurrent ? 'text-indigo-600 dark:text-indigo-400' : ''
            }`}
          >
            {song.title}
          </h4>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
            {song.artist}
          </p>
        </div>
      </div>

      {showAlbum && (
        <div className="col-span-2 hidden md:block text-sm text-gray-500 dark:text-gray-400 truncate">
          {song.album}
        </div>
      )}

      <div className="col-span-2 hidden md:block text-sm text-gray-500 dark:text-gray-400 truncate">
        {song.date}
      </div>

      <div className={`${showAlbum ? 'col-span-3 md:col-span-1' : 'col-span-3 md:col-span-1'} flex items-center justify-end space-x-3`}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            addToQueue(song)
          }}
          title={inQueue ? 'Already in current playlist' : 'Add to current playlist'}
          className={`${
            inQueue
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`}
        >
          <i className={`fas ${inQueue ? 'fa-check' : 'fa-plus'} text-sm`}></i>
        </button>
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          {song.duration}
        </span>
      </div>
    </div>
  )
}

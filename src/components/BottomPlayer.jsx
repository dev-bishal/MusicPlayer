import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext.jsx'
import { asset, formatTime } from '../lib/library.js'

export default function BottomPlayer() {
  const navigate = useNavigate()
  const {
    current,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    repeat,
    volume,
    toggle,
    next,
    prev,
    seek,
    skip,
    setShuffle,
    setRepeat,
    setVolume,
  } = usePlayer()

  if (!current) return null

  const openPlayer = () => navigate('/player')

  return (
    <div
      className={`fixed bottom-16 md:bottom-0 left-0 lg:left-64 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 md:p-4 shadow-lg z-20 ${
        isPlaying ? 'playing' : ''
      }`}
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Now playing — click to open the Player page */}
          <div
            className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-0 w-full md:w-1/4 cursor-pointer"
            onClick={openPlayer}
            title="Open player"
          >
            <div className="relative shrink-0">
              <img
                src={asset(current.cover)}
                alt={current.title}
                className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover"
              />
              <div className="now-playing-icon absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-white text-[8px]`}></i>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{current.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{current.artist}</p>
            </div>
            <button
              className="md:hidden text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              aria-label="Open player"
            >
              <i className="fas fa-chevron-up"></i>
            </button>
          </div>

          {/* Controls */}
          <div className="w-full md:w-2/4 mb-1 md:mb-0">
            <div className="flex items-center justify-center space-x-4 md:space-x-6 mb-2 md:mb-3">
              <button
                onClick={() => setShuffle(!shuffle)}
                className={`hidden md:block ${
                  shuffle
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                aria-label="Shuffle"
              >
                <i className="fas fa-random"></i>
              </button>
              <button
                onClick={prev}
                className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                aria-label="Previous"
              >
                <i className="fas fa-step-backward text-lg md:text-xl"></i>
              </button>
              <button
                onClick={toggle}
                className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button
                onClick={next}
                className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                aria-label="Next"
              >
                <i className="fas fa-step-forward text-lg md:text-xl"></i>
              </button>
              <button
                onClick={() => setRepeat(!repeat)}
                className={`hidden md:block ${
                  repeat
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                aria-label="Repeat"
              >
                <i className="fas fa-redo"></i>
              </button>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <span className="text-xs text-gray-500 w-10 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="flex-1"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
              />
              <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Extra controls */}
          <div className="hidden md:flex items-center justify-end space-x-4 w-full md:w-1/4">
            <button
              onClick={() => skip(-10)}
              className="hidden xl:block text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm whitespace-nowrap"
              title="Backward 10s"
            >
              <i className="fas fa-backward"></i> 10s
            </button>
            <button
              onClick={() => skip(10)}
              className="hidden xl:block text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm whitespace-nowrap"
              title="Forward 10s"
            >
              10s <i className="fas fa-forward"></i>
            </button>
            <button
              onClick={openPlayer}
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              title="Open queue"
            >
              <i className="fas fa-list"></i>
            </button>
            <div className="flex items-center">
              <i className="fas fa-volume-up text-gray-500 mr-2"></i>
              <input
                type="range"
                className="w-20"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

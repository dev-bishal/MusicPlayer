import { Link } from 'react-router-dom'
import { SongCard, PlaylistCard, ArtistCard, AlbumCard } from '../components/Cards.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import { albums, artists, playlists, playlistSongs, songs } from '../lib/library.js'

function SectionHeader({ title, to }) {
  return (
    <div className="flex items-center justify-between mb-4 md:mb-6">
      <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
      <Link
        to={to}
        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-sm md:text-base"
      >
        See all
      </Link>
    </div>
  )
}

function CarouselRow({ children }) {
  return (
    <div className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
      {children}
    </div>
  )
}

export default function Home() {
  const { playQueue } = usePlayer()
  const featured = playlists[0]
  const featuredSongs = featured ? playlistSongs(featured) : []
  const latest = songs.slice(0, 5)

  return (
    <div>
      {/* Featured playlist hero */}
      {featured && (
        <section className="mb-8 md:mb-12">
          <SectionHeader title="Featured Playlist" to="/playlists" />
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <span className="inline-block px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-medium mb-3 md:mb-4">
                Curated Playlist
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                {featured.name}
              </h2>
              <p className="text-white/90 mb-4 md:mb-6 text-sm md:text-base">
                {featured.description}
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => featuredSongs.length && playQueue(featuredSongs, 0)}
                  className="px-4 md:px-6 py-2 md:py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition text-sm md:text-base"
                >
                  <i className="fas fa-play mr-2"></i> Play All
                </button>
                <Link
                  to={`/playlists/${featured.id}`}
                  className="px-4 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition text-sm md:text-base"
                >
                  <i className="fas fa-list mr-2"></i> View Songs
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 mt-4 md:mt-0 w-full">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {playlists.slice(1, 3).map((pl) => (
                  <Link
                    key={pl.id}
                    to={`/playlists/${pl.id}`}
                    className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 hover:bg-white/30 transition"
                  >
                    <div
                      className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r ${pl.color} rounded-lg flex items-center justify-center mb-2 md:mb-3`}
                    >
                      <i className={`fas ${pl.icon} text-white text-sm md:text-base`}></i>
                    </div>
                    <h4 className="text-white font-semibold text-sm md:text-base truncate">
                      {pl.name}
                    </h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      {playlistSongs(pl).length} songs
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest added songs */}
      <section className="mb-8 md:mb-12">
        <SectionHeader title="Latest Added Songs" to="/songs" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {latest.map((song, i) => (
            <SongCard key={song.id} song={song} indexInList={i} list={latest} />
          ))}
        </div>
      </section>

      {/* Popular playlists */}
      <section className="mb-8 md:mb-12">
        <SectionHeader title="Popular Playlists" to="/playlists" />
        <CarouselRow>
          {playlists.map((pl) => (
            <div key={pl.id} className="w-40 xs:w-48 md:w-56 shrink-0">
              <PlaylistCard playlist={pl} />
            </div>
          ))}
        </CarouselRow>
      </section>

      {/* Top artists */}
      <section className="mb-8 md:mb-12">
        <SectionHeader title="Top Artists" to="/artists" />
        <CarouselRow>
          {artists.map((artist) => (
            <div key={artist.id} className="w-44 xs:w-52 md:w-60 shrink-0">
              <ArtistCard artist={artist} />
            </div>
          ))}
        </CarouselRow>
      </section>

      {/* New albums */}
      <section className="mb-8 md:mb-12">
        <SectionHeader title="New Albums" to="/albums" />
        <CarouselRow>
          {albums.map((album) => (
            <div key={album.id} className="w-40 xs:w-48 md:w-56 shrink-0">
              <AlbumCard album={album} />
            </div>
          ))}
        </CarouselRow>
      </section>
    </div>
  )
}

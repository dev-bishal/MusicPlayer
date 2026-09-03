// Loads all CMS-managed content (JSON files in src/content) at build time.
const songModules = import.meta.glob('../content/songs/*.json', { eager: true })
const albumModules = import.meta.glob('../content/albums/*.json', { eager: true })
const artistModules = import.meta.glob('../content/artists/*.json', { eager: true })
const playlistModules = import.meta.glob('../content/playlists/*.json', { eager: true })

const values = (mods) => Object.values(mods).map((m) => m.default ?? m)

// Newest first — "Latest Added" ordering used across the site
export const songs = values(songModules).sort(
  (a, b) => new Date(b.date) - new Date(a.date),
)
export const albums = values(albumModules).sort((a, b) => b.year - a.year)
export const artists = values(artistModules).sort((a, b) =>
  a.name.localeCompare(b.name),
)
export const playlists = values(playlistModules).sort((a, b) =>
  a.name.localeCompare(b.name),
)

const songById = Object.fromEntries(songs.map((s) => [s.id, s]))

export const getSong = (id) => songById[id]
export const getAlbum = (id) => albums.find((a) => a.id === id)
export const getArtist = (id) => artists.find((a) => a.id === id)
export const getPlaylist = (id) => playlists.find((p) => p.id === id)

export const albumSongs = (album) =>
  songs.filter((s) => s.album === album.title)
export const artistSongs = (artist) =>
  songs.filter((s) => s.artist === artist.name)
export const playlistSongs = (playlist) =>
  (playlist.songs || []).map((id) => songById[id]).filter(Boolean)

export const searchSongs = (query) => {
  const q = query.trim().toLowerCase()
  if (!q) return songs
  return songs.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      (s.album || '').toLowerCase().includes(q),
  )
}

// Resolve site-absolute media paths ("/media/...") against the deploy base
// so they work under a GitHub Pages sub-path.
export const asset = (p) =>
  p && p.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p

export const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export const totalDuration = (list) => {
  // song.duration is "M:SS"
  const secs = list.reduce((sum, s) => {
    const [m, sec] = (s.duration || '0:00').split(':').map(Number)
    return sum + m * 60 + (sec || 0)
  }, 0)
  return Math.round(secs / 60) + ' min'
}

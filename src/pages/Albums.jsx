import { useState } from 'react'
import { AlbumCard } from '../components/Cards.jsx'
import LoadMore from '../components/LoadMore.jsx'
import { albums } from '../lib/library.js'

const PAGE_SIZE = 8

export default function Albums() {
  const [shown, setShown] = useState(PAGE_SIZE)
  const visible = albums.slice(0, shown)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visible.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
      <LoadMore
        shown={shown}
        total={albums.length}
        onMore={() => setShown(shown + PAGE_SIZE)}
        endMessage="That's every album in your library"
      />
    </div>
  )
}

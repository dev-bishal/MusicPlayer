import { useState } from 'react'
import { ArtistCard } from '../components/Cards.jsx'
import LoadMore from '../components/LoadMore.jsx'
import { artists } from '../lib/library.js'

const PAGE_SIZE = 8

export default function Artists() {
  const [shown, setShown] = useState(PAGE_SIZE)
  const visible = artists.slice(0, shown)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visible.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
      <LoadMore
        shown={shown}
        total={artists.length}
        onMore={() => setShown(shown + PAGE_SIZE)}
        endMessage="That's every artist in your library"
      />
    </div>
  )
}

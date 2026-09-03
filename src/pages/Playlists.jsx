import { useState } from 'react'
import { PlaylistCard } from '../components/Cards.jsx'
import LoadMore from '../components/LoadMore.jsx'
import { playlists } from '../lib/library.js'

const PAGE_SIZE = 8

export default function Playlists() {
  const [shown, setShown] = useState(PAGE_SIZE)
  const visible = playlists.slice(0, shown)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visible.map((pl) => (
          <PlaylistCard key={pl.id} playlist={pl} />
        ))}
      </div>
      <LoadMore
        shown={shown}
        total={playlists.length}
        onMore={() => setShown(shown + PAGE_SIZE)}
        endMessage="That's every playlist you have"
      />
    </div>
  )
}

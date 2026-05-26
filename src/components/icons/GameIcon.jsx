import { Gamepad2 } from 'lucide-react'
import { games } from '@/data/mock'

const GAME_IMAGES = Object.fromEntries(
  games.filter((g) => g.image).map((g) => [g.id, g.image]),
)

export default function GameIcon({ gameId, className = 'h-7 w-7', style }) {
  const imageSrc = GAME_IMAGES[gameId]
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt=""
        className={`${className} shrink-0 rounded-lg object-contain`}
        style={style}
        aria-hidden
      />
    )
  }

  return <Gamepad2 className={className} style={style} aria-hidden />
}

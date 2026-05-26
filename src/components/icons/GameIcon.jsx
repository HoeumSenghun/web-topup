import {
  Swords,
  Flame,
  Crosshair,
  Crown,
  Sparkles,
  Bomb,
  Shield,
  Gem,
  Gamepad2,
} from 'lucide-react'

const ICON_MAP = {
  mlbb: Swords,
  ff: Flame,
  pubg: Crosshair,
  hok: Crown,
  genshin: Sparkles,
  codm: Bomb,
  rov: Shield,
  zepeto: Gem,
}

export default function GameIcon({ gameId, className = 'h-7 w-7', style }) {
  const Icon = ICON_MAP[gameId] ?? Gamepad2
  return <Icon className={className} style={style} aria-hidden />
}

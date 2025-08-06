import BlackAdvisor from '@/assets/pieces/black/advisor.svg'
import BlackCannon from '@/assets/pieces/black/cannon.svg'
import BlackChariot from '@/assets/pieces/black/chariot.svg'
import BlackElephant from '@/assets/pieces/black/elephant.svg'
import BlackGeneral from '@/assets/pieces/black/general.svg'
import BlackHorse from '@/assets/pieces/black/horse.svg'
import BlackSoldier from '@/assets/pieces/black/soldier.svg'
import RedAdvisor from '@/assets/pieces/red/advisor.svg'
import RedCannon from '@/assets/pieces/red/cannon.svg'
import RedChariot from '@/assets/pieces/red/chariot.svg'
import RedElephant from '@/assets/pieces/red/elephant.svg'
import RedGeneral from '@/assets/pieces/red/general.svg'
import RedHorse from '@/assets/pieces/red/horse.svg'
import RedSoldier from '@/assets/pieces/red/soldier.svg'
import AdvisorIcon from '@/assets/pieces/common/advisor.svg'
import CannonIcon from '@/assets/pieces/common/cannon.svg'
import ChariotIcon from '@/assets/pieces/common/chariot.svg'
import ElephantIcon from '@/assets/pieces/common/elephant.svg'
import GeneralIcon from '@/assets/pieces/common/general.svg'
import HorseIcon from '@/assets/pieces/common/horse.svg'
import SoldierIcon from '@/assets/pieces/common/soldier.svg'
import { PieceType, Side } from '@/logic'
import { FC } from 'react'
import { SvgProps } from 'react-native-svg'

type DisplaySide = Side | 'common'

export const ICONS: Record<DisplaySide, Record<PieceType, FC<SvgProps>>> = {
  red: {
    advisor: RedAdvisor,
    cannon: RedCannon,
    chariot: RedChariot,
    elephant: RedElephant,
    general: RedGeneral,
    horse: RedHorse,
    soldier: RedSoldier,
  },
  black: {
    advisor: BlackAdvisor,
    cannon: BlackCannon,
    chariot: BlackChariot,
    elephant: BlackElephant,
    general: BlackGeneral,
    horse: BlackHorse,
    soldier: BlackSoldier,
  },
  common: {
    advisor: AdvisorIcon,
    cannon: CannonIcon,
    chariot: ChariotIcon,
    elephant: ElephantIcon,
    general: GeneralIcon,
    horse: HorseIcon,
    soldier: SoldierIcon,
  },
} as const

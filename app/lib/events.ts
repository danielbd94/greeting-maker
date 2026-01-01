import type { EventType } from './types';

export const EVENT_LABELS: Record<EventType, string> = {
  birthday: 'יום הולדת',
  bar_mitzvah: 'בר מצווה',
  bat_mitzvah: 'בת מצווה',
  wedding: 'חתונה',
  brit: 'ברית',
  brita: 'בריתה',
};

export const EVENT_DEFAULT_KEYWORDS: Record<EventType, string[]> = {
  birthday: ['birthday balloons', 'birthday cake', 'confetti'],
  bar_mitzvah: ['bar mitzvah', 'torah scroll', 'synagogue celebration'],
  bat_mitzvah: ['bat mitzvah', 'celebration', 'synagogue'],
  wedding: ['wedding chuppah', 'bride and groom', 'wedding rings'],
  brit: ['newborn celebration', 'baby boy', 'family celebration'],
  brita: ['newborn celebration', 'baby girl', 'family celebration'],
};

export const EVENT_ACCENTS: Record<EventType, string[]> = {
  birthday: ['#F97316', '#A78BFA'],
  bar_mitzvah: ['#2563EB', '#EAB308'],
  bat_mitzvah: ['#DB2777', '#A78BFA'],
  wedding: ['#111827', '#E5E7EB'],
  brit: ['#0EA5E9', '#22C55E'],
  brita: ['#EC4899', '#F59E0B'],
};

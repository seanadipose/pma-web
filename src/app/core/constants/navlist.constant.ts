import { NavlistItem } from '../models/navlist-item.model';

export const NAV_LIST: NavlistItem[] = [
  {
    label: 'home',
    link: 'home',
    icon: 'home',
    fn: ( id: keyof NavlistItem, obj: NavlistItem ): string => {
      if (id === 'fn')return
      return obj[ id ];
    }
  },
  {
    label: 'journals',
    link: 'journals',
    icon: 'book',
    fn: ( id: keyof NavlistItem, obj: NavlistItem ): string => {
      if (id === 'fn')return

      return obj[ id ];
    }

  },
];


// const mapped = NAV_LIST.map(item => item.fn('', item))

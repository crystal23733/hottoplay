import { BarChart2, ChartBar, Dices, List } from 'lucide-react';

const navItems = [
  {
    title: 'Generate Numbers',
    href: '/mega-millions',
    icon: Dices,
  },
  {
    title: 'Number Statistics',
    href: '/mega-millions/statistics',
    icon: BarChart2,
  },
  {
    title: 'Number Frequency',
    href: '/mega-millions/frequency',
    icon: ChartBar,
  },
  {
    title: 'Draw Results',
    href: '/mega-millions/draws',
    icon: List,
  },
];

export default navItems;

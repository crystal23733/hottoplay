import { BarChart2, ChartBar, Dices, List } from 'lucide-react';

const navItems = [
  {
    title: 'Generate Numbers',
    href: '/power-ball',
    icon: Dices,
  },
  {
    title: 'Number Statistics',
    href: '/power-ball/statistics',
    icon: BarChart2,
  },
  {
    title: 'Number Frequency',
    href: '/power-ball/frequency',
    icon: ChartBar,
  },
  {
    title: 'Draw Results',
    href: '/power-ball/draws',
    icon: List,
  },
];

export default navItems;

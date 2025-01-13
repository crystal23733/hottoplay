import DreamData from '@/data/dreams/types';

export default interface DreamListProps {
  dreams: DreamData[];
  searchTerm: string;
}

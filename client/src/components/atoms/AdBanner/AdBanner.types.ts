import { AD_SIZES } from '@/constants/AD_SIZES';

type AdSizeKey = keyof typeof AD_SIZES;

export default interface AdBannerProps {
  size: AdSizeKey;
  className?: string;
}

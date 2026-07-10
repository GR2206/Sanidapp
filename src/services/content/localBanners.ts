import bannersIndex from '../../../content/banners/index.json';
import bannerTOP from '../../../content/banners/bannerTOP.json';
import bannerMEDIO from '../../../content/banners/bannerMEDIO.json';
import bannerBOT from '../../../content/banners/bannerBOT.json';
import type { BannerIndex, BannerSlot, BannerSlotId } from '@/types/banner';

export const LOCAL_BANNER_INDEX = bannersIndex as BannerIndex;

export const LOCAL_BANNERS: Record<BannerSlotId, BannerSlot> = {
  bannerTOP: bannerTOP as BannerSlot,
  bannerMEDIO: bannerMEDIO as BannerSlot,
  bannerBOT: bannerBOT as BannerSlot,
};

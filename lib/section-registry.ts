import dynamic from 'next/dynamic';

// Dynamic imports for all section components
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'));
const CardGridSection = dynamic(() => import('@/components/sections/CardGridSection'));
const StatsBarSection = dynamic(() => import('@/components/sections/StatsBarSection'));
const EventsPreviewSection = dynamic(() => import('@/components/sections/EventsPreviewSection'));
const FaqSection = dynamic(() => import('@/components/sections/FaqSection'));
const ImageTextSection = dynamic(() => import('@/components/sections/ImageTextSection'));
const TextBlockSection = dynamic(() => import('@/components/sections/TextBlockSection'));
const DonationCtaSection = dynamic(() => import('@/components/sections/DonationCtaSection'));
const TeamGridSection = dynamic(() => import('@/components/sections/TeamGridSection'));
const GalleryStripSection = dynamic(() => import('@/components/sections/GalleryStripSection'));
const GalleryGridSection = dynamic(() => import('@/components/sections/GalleryGridSection'));
const AnnouncementsSection = dynamic(() => import('@/components/sections/AnnouncementsSection'));
const ChapterSpotlightSection = dynamic(() => import('@/components/sections/ChapterSpotlightSection'));
const ContactFormSection = dynamic(() => import('@/components/sections/ContactFormSection'));
const AlmaMaterSection = dynamic(() => import('@/components/sections/AlmaMaterSection'));
const TestimonialSection = dynamic(() => import('@/components/sections/TestimonialSection'));
const SpacerSection = dynamic(() => import('@/components/sections/SpacerSection'));
const DividerSection = dynamic(() => import('@/components/sections/DividerSection'));
const FullWidthImageSection = dynamic(() => import('@/components/sections/FullWidthImageSection'));
const CustomHtmlSection = dynamic(() => import('@/components/sections/CustomHtmlSection'));

export const SECTION_COMPONENTS: Record<string, any> = {
  HeroSection,
  CardGridSection,
  StatsBarSection,
  EventsPreviewSection,
  FaqSection,
  ImageTextSection,
  TextBlockSection,
  DonationCtaSection,
  TeamGridSection,
  GalleryStripSection,
  GalleryGridSection,
  AnnouncementsSection,
  ChapterSpotlightSection,
  ContactFormSection,
  AlmaMaterSection,
  TestimonialSection,
  SpacerSection,
  DividerSection,
  FullWidthImageSection,
  CustomHtmlSection,
};

export function getSectionComponent(name: string) {
  return SECTION_COMPONENTS[name] || null;
}

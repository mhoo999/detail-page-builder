import { ComponentTemplate, HeroComponent, SliderComponent, VideoComponent, DividerComponent, GridComponent } from '../types'

export const COMPONENT_TEMPLATES: ComponentTemplate[] = [
  {
    type: 'hero',
    label: '히어로 섹션',
    description: '타이틀, 설명, 버튼이 있는 메인 섹션',
    icon: '🎯',
  },
  {
    type: 'slider',
    label: '이미지 슬라이더',
    description: '여러 이미지를 슬라이드로 표시',
    icon: '🖼️',
  },
  {
    type: 'video',
    label: '비디오',
    description: 'YouTube 또는 직접 업로드 비디오',
    icon: '🎬',
  },
  {
    type: 'divider',
    label: '구분선',
    description: '섹션 구분을 위한 선 또는 여백',
    icon: '➖',
  },
  {
    type: 'grid',
    label: '그리드/리스트',
    description: '상품 목록, 스펙 테이블 등',
    icon: '📋',
  },
]

// Default values for each component type
export const DEFAULT_HERO: HeroComponent['data'] = {
  backgroundColor: '#ffffff',
  showOverlayImage: false,
  overlayImage: '',
  showSectionTitle: true,
  sectionTitle: 'NEW ARRIVAL',
  sectionTitleColor: '#ffffff',
  sectionTitleBgColor: '#3b82f6',
  showTitle: true,
  title: '여기에 메인 타이틀을 입력하세요',
  titleSize: '48px',
  titleWeight: '700',
  titleColor: '#000000',
  showDescription: true,
  description: '상세한 설명을 입력하세요',
  descriptionSize: '18px',
  descriptionWeight: '400',
  descriptionColor: '#666666',
  showDescriptionImage: false,
  descriptionImage: '',
  showButton: true,
  buttonText: '자세히 보기',
  buttonSize: '16px',
  buttonWeight: '600',
  buttonColor: '#ffffff',
  buttonBgColor: '#000000',
  height: '600px',
  align: 'center',
  justify: 'center',
}

export const DEFAULT_SLIDER: SliderComponent['data'] = {
  backgroundColor: '#f3f4f6',
  images: ['https://via.placeholder.com/1200x600/3b82f6/ffffff?text=Slide+1'],
  imageWidth: '1140px',
  height: '500px',
  autoPlay: false,
  interval: 3000,
  showIndicators: true,
}

export const DEFAULT_VIDEO: VideoComponent['data'] = {
  backgroundColor: '#000000',
  videoType: 'youtube',
  videoUrl: '',
  height: '500px',
  autoPlay: false,
  muted: true,
  loop: false,
}

export const DEFAULT_DIVIDER: DividerComponent['data'] = {
  backgroundColor: 'transparent',
  height: '40px',
  showLine: true,
  lineStyle: 'solid',
  lineColor: '#e5e7eb',
  lineWidth: '1px',
}

export const DEFAULT_GRID: GridComponent['data'] = {
  backgroundColor: '#ffffff',
  itemBackgroundColor: '#ffffff',
  columns: 3,
  gap: '20px',
  iconSize: '80px',
  items: [
    { id: '1', image: 'https://via.placeholder.com/80', title: '아이템 1', description: '설명 1' },
    { id: '2', image: 'https://via.placeholder.com/80', title: '아이템 2', description: '설명 2' },
    { id: '3', image: 'https://via.placeholder.com/80', title: '아이템 3', description: '설명 3' },
  ],
}

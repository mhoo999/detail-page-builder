import { ComponentTemplate, HeroComponent, SliderComponent, VideoComponent, DividerComponent, GridComponent, TableComponent, FAQComponent, TabsComponent, CTAComponent, BeforeAfterComponent, CountdownComponent } from '../types'

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
  {
    type: 'table',
    label: '표',
    description: '데이터를 표 형식으로 표시',
    icon: '📊',
  },
  {
    type: 'faq',
    label: 'FAQ/아코디언',
    description: '자주 묻는 질문을 접었다 펼 수 있는 형태',
    icon: '❓',
  },
  {
    type: 'tabs',
    label: '탭',
    description: '여러 정보를 탭으로 구분하여 표시',
    icon: '📑',
  },
  {
    type: 'cta',
    label: 'CTA 버튼',
    description: '구매하기, 문의하기 등 주요 액션 버튼',
    icon: '🔘',
  },
  {
    type: 'beforeAfter',
    label: 'Before/After',
    description: '드래그하여 비교하는 이미지 슬라이더',
    icon: '⚖️',
  },
  {
    type: 'countdown',
    label: '카운트다운',
    description: '세일 종료, 이벤트 마감 시간 표시',
    icon: '⏰',
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
  titleSize: '48',
  titleWeight: '700',
  titleColor: '#000000',
  showDescription: true,
  description: '상세한 설명을 입력하세요',
  descriptionSize: '18',
  descriptionWeight: '400',
  descriptionColor: '#666666',
  descriptionAlign: 'center',
  descriptionLetterSpacing: '0',
  showDescriptionImage: false,
  descriptionImage: '',
  showButton: true,
  buttonText: '자세히 보기',
  buttonSize: '16',
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
  height: 'auto',
  items: [
    { id: '1', image: 'https://via.placeholder.com/80', title: '아이템 1', description: '설명 1' },
    { id: '2', image: 'https://via.placeholder.com/80', title: '아이템 2', description: '설명 2' },
    { id: '3', image: 'https://via.placeholder.com/80', title: '아이템 3', description: '설명 3' },
  ],
}

export const DEFAULT_TABLE: TableComponent['data'] = {
  backgroundColor: '#ffffff',
  headerBackgroundColor: '#000000',
  headerTextColor: '#ffffff',
  cellBackgroundColor: '#ffffff',
  cellTextColor: '#000000',
  borderColor: '#e5e7eb',
  borderWidth: '1px',
  height: 'auto',
  columns: [
    { id: 'col1', label: '항목', width: '200px', textAlign: 'left' },
    { id: 'col2', label: '내용', width: 'auto', textAlign: 'left' },
  ],
  rows: [
    { id: 'row1', cells: ['항목 1', '내용 1'] },
    { id: 'row2', cells: ['항목 2', '내용 2'] },
  ],
}

export const DEFAULT_FAQ: FAQComponent['data'] = {
  backgroundColor: '#ffffff',
  height: 'auto',
  titleText: '자주 묻는 질문',
  titleSize: '28',
  titleWeight: '700',
  titleColor: '#000000',
  showTitle: true,
  questionColor: '#000000',
  questionBgColor: '#f9fafb',
  answerColor: '#666666',
  answerBgColor: '#ffffff',
  borderColor: '#e5e7eb',
  iconColor: '#000000',
  items: [
    { id: 'faq1', question: '질문 1을 입력하세요', answer: '답변 1을 입력하세요' },
    { id: 'faq2', question: '질문 2를 입력하세요', answer: '답변 2를 입력하세요' },
  ],
}

export const DEFAULT_TABS: TabsComponent['data'] = {
  backgroundColor: '#ffffff',
  height: 'auto',
  tabBgColor: '#f3f4f6',
  tabActiveColor: '#000000',
  tabTextColor: '#666666',
  tabActiveTextColor: '#ffffff',
  contentBgColor: '#ffffff',
  contentTextColor: '#333333',
  borderColor: '#e5e7eb',
  items: [
    { id: 'tab1', label: '상세정보', content: '상세정보 내용을 입력하세요' },
    { id: 'tab2', label: '리뷰', content: '리뷰 내용을 입력하세요' },
    { id: 'tab3', label: '배송안내', content: '배송안내 내용을 입력하세요' },
  ],
}

export const DEFAULT_CTA: CTAComponent['data'] = {
  backgroundColor: '#3b82f6',
  height: 'auto',
  showTitle: true,
  title: '지금 바로 시작하세요',
  titleSize: '32',
  titleWeight: '700',
  titleColor: '#ffffff',
  showDescription: true,
  description: '특별한 혜택과 함께 지금 구매하세요',
  descriptionSize: '16',
  descriptionColor: '#e0e7ff',
  buttonText: '구매하기',
  buttonSize: '18',
  buttonWeight: '600',
  buttonColor: '#3b82f6',
  buttonBgColor: '#ffffff',
  buttonBorderRadius: '8px',
  buttonWidth: '200px',
}

export const DEFAULT_BEFORE_AFTER: BeforeAfterComponent['data'] = {
  backgroundColor: '#ffffff',
  height: 'auto',
  beforeImage: 'https://via.placeholder.com/600x400/ef4444/ffffff?text=Before',
  afterImage: 'https://via.placeholder.com/600x400/22c55e/ffffff?text=After',
  beforeLabel: 'Before',
  afterLabel: 'After',
  labelColor: '#ffffff',
  labelBgColor: '#000000',
  sliderColor: '#ffffff',
  imageHeight: '400px',
}

export const DEFAULT_COUNTDOWN: CountdownComponent['data'] = {
  backgroundColor: '#ef4444',
  height: 'auto',
  targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  showTitle: true,
  title: '특가 세일 종료까지',
  titleSize: '24',
  titleWeight: '600',
  titleColor: '#ffffff',
  numberSize: '48',
  numberColor: '#ef4444',
  numberBgColor: '#ffffff',
  labelSize: '14',
  labelColor: '#ffffff',
  expiredMessage: '이벤트가 종료되었습니다',
}

// Component Types
export type ComponentType = 'hero' | 'slider' | 'video' | 'divider' | 'grid' | 'table' | 'faq' | 'tabs' | 'cta' | 'beforeAfter' | 'countdown' | 'review' | 'iconList' | 'stickyBar'

// Base styles shared across all components
export interface BaseStyles {
  width?: string
  height?: string
  padding?: string
  margin?: string
  backgroundColor?: string
  backgroundImage?: string
  [key: string]: string | undefined
}

// Hero/Text Section Component
export interface HeroComponent {
  id: string
  type: 'hero'
  data: {
    // Background
    backgroundColor: string
    showOverlayImage: boolean
    overlayImage: string

    // Section Title (버튼 스타일)
    showSectionTitle: boolean
    sectionTitle: string
    sectionTitleColor: string
    sectionTitleBgColor: string

    // Main Title
    showTitle: boolean
    title: string
    titleSize: string
    titleWeight: '400' | '500' | '600' | '700'
    titleColor: string

    // Description
    showDescription: boolean
    description: string
    descriptionSize: string
    descriptionWeight: '400' | '500' | '600' | '700'
    descriptionColor: string
    descriptionAlign: 'left' | 'center' | 'right' | 'justify'
    descriptionLetterSpacing: string

    // Description Image
    showDescriptionImage: boolean
    descriptionImage: string

    // Button
    showButton: boolean
    buttonText: string
    buttonSize: string
    buttonWeight: '400' | '500' | '600' | '700'
    buttonColor: string
    buttonBgColor: string

    // Layout
    height: string
    align: 'left' | 'center' | 'right'
    justify: 'start' | 'center' | 'end'
  }
}

// Image Slider Component
export interface SliderComponent {
  id: string
  type: 'slider'
  data: {
    backgroundColor: string
    images: string[]
    imageWidth: string
    height: string
    autoPlay: boolean
    interval: number
    showIndicators: boolean
  }
}

// Video Component
export interface VideoComponent {
  id: string
  type: 'video'
  data: {
    backgroundColor: string
    videoType: 'youtube' | 'url'
    videoUrl: string
    height: string
    autoPlay: boolean
    muted: boolean
    loop: boolean
  }
}

// Divider Component
export interface DividerComponent {
  id: string
  type: 'divider'
  data: {
    backgroundColor: string
    height: string
    showLine: boolean
    lineStyle: 'solid' | 'dashed' | 'dotted'
    lineColor: string
    lineWidth: string
  }
}

// Grid/List Component
export interface GridComponent {
  id: string
  type: 'grid'
  data: {
    backgroundColor: string
    itemBackgroundColor: string
    columns: number
    gap: string
    iconSize: string
    height?: string
    items: {
      id: string
      image: string
      title: string
      description: string
    }[]
  }
}

// Table Component
export interface TableComponent {
  id: string
  type: 'table'
  data: {
    backgroundColor: string
    headerBackgroundColor: string
    headerTextColor: string
    cellBackgroundColor: string
    cellTextColor: string
    borderColor: string
    borderWidth: string
    height?: string
    columns: {
      id: string
      label: string
      width?: string
      textAlign?: 'left' | 'center' | 'right' | 'justify'
    }[]
    rows: {
      id: string
      cells: string[]
    }[]
  }
}

// FAQ/Accordion Component
export interface FAQComponent {
  id: string
  type: 'faq'
  data: {
    backgroundColor: string
    height?: string
    titleText: string
    titleSize: string
    titleWeight: '400' | '500' | '600' | '700'
    titleColor: string
    showTitle: boolean
    questionColor: string
    questionBgColor: string
    answerColor: string
    answerBgColor: string
    borderColor: string
    iconColor: string
    items: {
      id: string
      question: string
      answer: string
    }[]
  }
}

// Tabs Component
export interface TabsComponent {
  id: string
  type: 'tabs'
  data: {
    backgroundColor: string
    height?: string
    tabBgColor: string
    tabActiveColor: string
    tabTextColor: string
    tabActiveTextColor: string
    contentBgColor: string
    contentTextColor: string
    borderColor: string
    items: {
      id: string
      label: string
      content: string
    }[]
  }
}

// CTA Button Section Component
export interface CTAComponent {
  id: string
  type: 'cta'
  data: {
    backgroundColor: string
    height?: string
    showTitle: boolean
    title: string
    titleSize: string
    titleWeight: '400' | '500' | '600' | '700'
    titleColor: string
    showDescription: boolean
    description: string
    descriptionSize: string
    descriptionColor: string
    buttonText: string
    buttonSize: string
    buttonWeight: '400' | '500' | '600' | '700'
    buttonColor: string
    buttonBgColor: string
    buttonBorderRadius: string
    buttonWidth: string
  }
}

// Before/After Comparison Component
export interface BeforeAfterComponent {
  id: string
  type: 'beforeAfter'
  data: {
    backgroundColor: string
    height?: string
    beforeImage: string
    afterImage: string
    beforeLabel: string
    afterLabel: string
    labelColor: string
    labelBgColor: string
    sliderColor: string
    imageHeight: string
  }
}

// Countdown Timer Component
export interface CountdownComponent {
  id: string
  type: 'countdown'
  data: {
    backgroundColor: string
    height?: string
    targetDate: string
    showTitle: boolean
    title: string
    titleSize: string
    titleWeight: '400' | '500' | '600' | '700'
    titleColor: string
    numberSize: string
    numberColor: string
    numberBgColor: string
    labelSize: string
    labelColor: string
    expiredMessage: string
  }
}

// Review Carousel Component
export interface ReviewComponent {
  id: string
  type: 'review'
  data: {
    backgroundColor: string
    height?: string
    showTitle: boolean
    title: string
    titleSize: string
    titleWeight: '400' | '500' | '600' | '700'
    titleColor: string
    cardBgColor: string
    cardTextColor: string
    starColor: string
    autoPlay: boolean
    interval: number
    items: {
      id: string
      rating: number
      content: string
      author: string
    }[]
  }
}

// Icon List Component
export interface IconListComponent {
  id: string
  type: 'iconList'
  data: {
    backgroundColor: string
    height?: string
    showTitle: boolean
    title: string
    titleSize: string
    titleWeight: '400' | '500' | '600' | '700'
    titleColor: string
    layout: 'horizontal' | 'vertical'
    iconSize: string
    iconColor: string
    textColor: string
    textSize: string
    gap: string
    items: {
      id: string
      icon: string
      text: string
    }[]
  }
}

// Sticky Bottom Bar Component
export interface StickyBarComponent {
  id: string
  type: 'stickyBar'
  data: {
    backgroundColor: string
    height: string
    showPrice: boolean
    priceLabel: string
    price: string
    priceSize: string
    priceColor: string
    buttonText: string
    buttonSize: string
    buttonWeight: '400' | '500' | '600' | '700'
    buttonColor: string
    buttonBgColor: string
    buttonBorderRadius: string
  }
}

export type Component =
  | HeroComponent
  | SliderComponent
  | VideoComponent
  | DividerComponent
  | GridComponent
  | TableComponent
  | FAQComponent
  | TabsComponent
  | CTAComponent
  | BeforeAfterComponent
  | CountdownComponent
  | ReviewComponent
  | IconListComponent
  | StickyBarComponent

export interface ComponentTemplate {
  type: ComponentType
  label: string
  description: string
  icon: string
}

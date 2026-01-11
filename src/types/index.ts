// Component Types
export type ComponentType = 'hero' | 'slider' | 'video' | 'divider' | 'grid'

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
    backgroundType: 'color' | 'image'
    backgroundColor: string
    backgroundImage: string

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
    images: string[]
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
    columns: number
    gap: string
    items: {
      id: string
      image: string
      title: string
      description: string
    }[]
  }
}

export type Component =
  | HeroComponent
  | SliderComponent
  | VideoComponent
  | DividerComponent
  | GridComponent

export interface ComponentTemplate {
  type: ComponentType
  label: string
  description: string
  icon: string
}

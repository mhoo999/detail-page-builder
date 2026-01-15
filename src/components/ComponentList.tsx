import { COMPONENT_TEMPLATES, DEFAULT_HERO, DEFAULT_SLIDER, DEFAULT_VIDEO, DEFAULT_DIVIDER, DEFAULT_GRID, DEFAULT_TABLE, DEFAULT_FAQ, DEFAULT_TABS, DEFAULT_CTA, DEFAULT_BEFORE_AFTER, DEFAULT_COUNTDOWN, DEFAULT_REVIEW, DEFAULT_ICON_LIST, DEFAULT_STICKY_BAR, DEFAULT_QUOTE } from '../constants/componentTemplates'
import { Component, HeroComponent, SliderComponent, VideoComponent, DividerComponent, GridComponent, TableComponent, FAQComponent, TabsComponent, CTAComponent, BeforeAfterComponent, CountdownComponent, ReviewComponent, IconListComponent, StickyBarComponent, QuoteComponent } from '../types'

interface ComponentListProps {
  onAddComponent: (component: Component) => void
}

export function ComponentList({ onAddComponent }: ComponentListProps) {
  const handleClick = (template: typeof COMPONENT_TEMPLATES[0]) => {
    let newComponent: Component

    switch (template.type) {
      case 'hero':
        newComponent = {
          id: `hero-${Date.now()}`,
          type: 'hero',
          data: { ...DEFAULT_HERO },
        } as HeroComponent
        break
      case 'slider':
        newComponent = {
          id: `slider-${Date.now()}`,
          type: 'slider',
          data: { ...DEFAULT_SLIDER },
        } as SliderComponent
        break
      case 'video':
        newComponent = {
          id: `video-${Date.now()}`,
          type: 'video',
          data: { ...DEFAULT_VIDEO },
        } as VideoComponent
        break
      case 'divider':
        newComponent = {
          id: `divider-${Date.now()}`,
          type: 'divider',
          data: { ...DEFAULT_DIVIDER },
        } as DividerComponent
        break
      case 'grid':
        newComponent = {
          id: `grid-${Date.now()}`,
          type: 'grid',
          data: { ...DEFAULT_GRID, items: DEFAULT_GRID.items.map(item => ({ ...item })) },
        } as GridComponent
        break
      case 'table':
        newComponent = {
          id: `table-${Date.now()}`,
          type: 'table',
          data: {
            ...DEFAULT_TABLE,
            columns: DEFAULT_TABLE.columns.map(col => ({ ...col })),
            rows: DEFAULT_TABLE.rows.map(row => ({ ...row, cells: [...row.cells] }))
          },
        } as TableComponent
        break
      case 'faq':
        newComponent = {
          id: `faq-${Date.now()}`,
          type: 'faq',
          data: {
            ...DEFAULT_FAQ,
            items: DEFAULT_FAQ.items.map(item => ({ ...item }))
          },
        } as FAQComponent
        break
      case 'tabs':
        newComponent = {
          id: `tabs-${Date.now()}`,
          type: 'tabs',
          data: {
            ...DEFAULT_TABS,
            items: DEFAULT_TABS.items.map(item => ({ ...item }))
          },
        } as TabsComponent
        break
      case 'cta':
        newComponent = {
          id: `cta-${Date.now()}`,
          type: 'cta',
          data: { ...DEFAULT_CTA },
        } as CTAComponent
        break
      case 'beforeAfter':
        newComponent = {
          id: `beforeAfter-${Date.now()}`,
          type: 'beforeAfter',
          data: { ...DEFAULT_BEFORE_AFTER },
        } as BeforeAfterComponent
        break
      case 'countdown':
        newComponent = {
          id: `countdown-${Date.now()}`,
          type: 'countdown',
          data: { ...DEFAULT_COUNTDOWN },
        } as CountdownComponent
        break
      case 'review':
        newComponent = {
          id: `review-${Date.now()}`,
          type: 'review',
          data: { ...DEFAULT_REVIEW, items: DEFAULT_REVIEW.items.map(item => ({ ...item })) },
        } as ReviewComponent
        break
      case 'iconList':
        newComponent = {
          id: `iconList-${Date.now()}`,
          type: 'iconList',
          data: { ...DEFAULT_ICON_LIST, items: DEFAULT_ICON_LIST.items.map(item => ({ ...item })) },
        } as IconListComponent
        break
      case 'stickyBar':
        newComponent = {
          id: `stickyBar-${Date.now()}`,
          type: 'stickyBar',
          data: { ...DEFAULT_STICKY_BAR },
        } as StickyBarComponent
        break
      case 'quote':
        newComponent = {
          id: `quote-${Date.now()}`,
          type: 'quote',
          data: { ...DEFAULT_QUOTE },
        } as QuoteComponent
        break
      default:
        return
    }

    onAddComponent(newComponent)
  }

  return (
    <aside className="w-64 bg-white border-r border-black p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-black">컴포넌트</h2>
      <div className="space-y-2">
        {COMPONENT_TEMPLATES.map((template) => (
          <div
            key={template.type}
            className="p-3 bg-white border border-black cursor-pointer hover:bg-gray-100"
            onClick={() => handleClick(template)}
          >
            <p className="font-medium text-black">
              {template.icon} {template.label}
            </p>
            <p className="text-xs text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

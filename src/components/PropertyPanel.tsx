import { Component } from '../types'

interface PropertyPanelProps {
  selectedComponent: Component | undefined
  onUpdateComponent: (id: string, updates: Partial<Component>) => void
}

export function PropertyPanel({
  selectedComponent,
  onUpdateComponent,
}: PropertyPanelProps) {
  if (!selectedComponent) {
    return (
      <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">속성</h2>
        <p className="text-sm text-gray-500">
          컴포넌트를 선택하면 여기에서 편집할 수 있습니다
        </p>
      </aside>
    )
  }

  const updateData = (key: string, value: any) => {
    onUpdateComponent(selectedComponent.id, {
      ...selectedComponent,
      data: { ...selectedComponent.data, [key]: value },
    } as any)
  }

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">속성</h2>

      {selectedComponent.type === 'hero' && (
        <HeroProperties component={selectedComponent} updateData={updateData} />
      )}
      {selectedComponent.type === 'slider' && (
        <SliderProperties component={selectedComponent} updateData={updateData} />
      )}
      {selectedComponent.type === 'video' && (
        <VideoProperties component={selectedComponent} updateData={updateData} />
      )}
      {selectedComponent.type === 'divider' && (
        <DividerProperties component={selectedComponent} updateData={updateData} />
      )}
      {selectedComponent.type === 'grid' && (
        <GridProperties component={selectedComponent} updateData={updateData} />
      )}
    </aside>
  )
}

function HeroProperties({ component, updateData }: {
  component: Extract<Component, { type: 'hero' }>
  updateData: (key: string, value: any) => void
}) {
  const { data } = component

  return (
    <div className="space-y-4">
      {/* Background */}
      <Section title="배경">
        <ColorInput
          label="배경색"
          value={data.backgroundColor}
          onChange={(v) => updateData('backgroundColor', v)}
        />
        <Toggle
          label="오버레이 이미지"
          value={data.showOverlayImage}
          onChange={(v) => updateData('showOverlayImage', v)}
        />
        {data.showOverlayImage && (
          <TextInput
            label="이미지 URL"
            value={data.overlayImage}
            onChange={(v) => updateData('overlayImage', v)}
            placeholder="https://..."
          />
        )}
      </Section>

      {/* Section Title */}
      <Section title="섹션 타이틀">
        <Toggle
          label="보이기"
          value={data.showSectionTitle}
          onChange={(v) => updateData('showSectionTitle', v)}
        />
        {data.showSectionTitle && (
          <>
            <TextInput
              label="텍스트"
              value={data.sectionTitle}
              onChange={(v) => updateData('sectionTitle', v)}
            />
            <ColorInput
              label="텍스트 색상"
              value={data.sectionTitleColor}
              onChange={(v) => updateData('sectionTitleColor', v)}
            />
            <ColorInput
              label="배경색"
              value={data.sectionTitleBgColor}
              onChange={(v) => updateData('sectionTitleBgColor', v)}
            />
          </>
        )}
      </Section>

      {/* Main Title */}
      <Section title="메인 타이틀">
        <Toggle
          label="보이기"
          value={data.showTitle}
          onChange={(v) => updateData('showTitle', v)}
        />
        {data.showTitle && (
          <>
            <TextInput
              label="텍스트"
              value={data.title}
              onChange={(v) => updateData('title', v)}
            />
            <TextInput
              label="크기 (px)"
              value={data.titleSize}
              onChange={(v) => updateData('titleSize', v)}
              placeholder="48px"
            />
            <Select
              label="굵기"
              value={data.titleWeight}
              onChange={(v) => updateData('titleWeight', v)}
              options={[
                { value: '400', label: 'Regular' },
                { value: '500', label: 'Medium' },
                { value: '600', label: 'SemiBold' },
                { value: '700', label: 'Bold' },
              ]}
            />
            <ColorInput
              label="색상"
              value={data.titleColor}
              onChange={(v) => updateData('titleColor', v)}
            />
          </>
        )}
      </Section>

      {/* Description */}
      <Section title="설명">
        <Toggle
          label="보이기"
          value={data.showDescription}
          onChange={(v) => updateData('showDescription', v)}
        />
        {data.showDescription && (
          <>
            <TextArea
              label="텍스트"
              value={data.description}
              onChange={(v) => updateData('description', v)}
            />
            <TextInput
              label="크기 (px)"
              value={data.descriptionSize}
              onChange={(v) => updateData('descriptionSize', v)}
              placeholder="18px"
            />
            <Select
              label="굵기"
              value={data.descriptionWeight}
              onChange={(v) => updateData('descriptionWeight', v)}
              options={[
                { value: '400', label: 'Regular' },
                { value: '500', label: 'Medium' },
                { value: '600', label: 'SemiBold' },
                { value: '700', label: 'Bold' },
              ]}
            />
            <ColorInput
              label="색상"
              value={data.descriptionColor}
              onChange={(v) => updateData('descriptionColor', v)}
            />
          </>
        )}
      </Section>

      {/* Description Image */}
      <Section title="설명 아래 이미지">
        <Toggle
          label="보이기"
          value={data.showDescriptionImage}
          onChange={(v) => updateData('showDescriptionImage', v)}
        />
        {data.showDescriptionImage && (
          <TextInput
            label="이미지 URL"
            value={data.descriptionImage}
            onChange={(v) => updateData('descriptionImage', v)}
            placeholder="https://..."
          />
        )}
      </Section>

      {/* Button */}
      <Section title="버튼">
        <Toggle
          label="보이기"
          value={data.showButton}
          onChange={(v) => updateData('showButton', v)}
        />
        {data.showButton && (
          <>
            <TextInput
              label="텍스트"
              value={data.buttonText}
              onChange={(v) => updateData('buttonText', v)}
            />
            <TextInput
              label="크기 (px)"
              value={data.buttonSize}
              onChange={(v) => updateData('buttonSize', v)}
              placeholder="16px"
            />
            <Select
              label="굵기"
              value={data.buttonWeight}
              onChange={(v) => updateData('buttonWeight', v)}
              options={[
                { value: '400', label: 'Regular' },
                { value: '500', label: 'Medium' },
                { value: '600', label: 'SemiBold' },
                { value: '700', label: 'Bold' },
              ]}
            />
            <ColorInput
              label="텍스트 색상"
              value={data.buttonColor}
              onChange={(v) => updateData('buttonColor', v)}
            />
            <ColorInput
              label="배경색"
              value={data.buttonBgColor}
              onChange={(v) => updateData('buttonBgColor', v)}
            />
          </>
        )}
      </Section>

      {/* Layout */}
      <Section title="레이아웃">
        <TextInput
          label="높이"
          value={data.height}
          onChange={(v) => updateData('height', v)}
          placeholder="600px"
        />
        <Select
          label="가로 정렬"
          value={data.align}
          onChange={(v) => updateData('align', v)}
          options={[
            { value: 'left', label: '왼쪽' },
            { value: 'center', label: '가운데' },
            { value: 'right', label: '오른쪽' },
          ]}
        />
        <Select
          label="세로 정렬"
          value={data.justify}
          onChange={(v) => updateData('justify', v)}
          options={[
            { value: 'start', label: '위' },
            { value: 'center', label: '가운데' },
            { value: 'end', label: '아래' },
          ]}
        />
      </Section>
    </div>
  )
}

function SliderProperties({ component, updateData }: {
  component: Extract<Component, { type: 'slider' }>
  updateData: (key: string, value: any) => void
}) {
  const { data } = component

  const addImage = () => {
    updateData('images', [...data.images, 'https://via.placeholder.com/1200x600'])
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...data.images]
    newImages[index] = value
    updateData('images', newImages)
  }

  const removeImage = (index: number) => {
    updateData('images', data.images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <Section title="배경">
        <ColorInput
          label="배경색"
          value={data.backgroundColor}
          onChange={(v) => updateData('backgroundColor', v)}
        />
      </Section>

      <Section title="이미지">
        {data.images.map((image, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={image}
              onChange={(e) => updateImage(index, e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
              placeholder="이미지 URL"
            />
            <button
              onClick={() => removeImage(index)}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded"
            >
              삭제
            </button>
          </div>
        ))}
        <button
          onClick={addImage}
          className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded"
        >
          + 이미지 추가
        </button>
      </Section>

      <Section title="설정">
        <TextInput
          label="이미지 너비"
          value={data.imageWidth}
          onChange={(v) => updateData('imageWidth', v)}
          placeholder="1140px"
        />
        <TextInput
          label="높이"
          value={data.height}
          onChange={(v) => updateData('height', v)}
          placeholder="500px"
        />
        <Toggle
          label="자동 재생"
          value={data.autoPlay}
          onChange={(v) => updateData('autoPlay', v)}
        />
        {data.autoPlay && (
          <TextInput
            label="간격 (ms)"
            value={data.interval.toString()}
            onChange={(v) => updateData('interval', parseInt(v) || 3000)}
            placeholder="3000"
          />
        )}
        <Toggle
          label="인디케이터 표시"
          value={data.showIndicators}
          onChange={(v) => updateData('showIndicators', v)}
        />
      </Section>
    </div>
  )
}

function VideoProperties({ component, updateData }: {
  component: Extract<Component, { type: 'video' }>
  updateData: (key: string, value: any) => void
}) {
  const { data } = component

  return (
    <div className="space-y-4">
      <Section title="배경">
        <ColorInput
          label="배경색"
          value={data.backgroundColor}
          onChange={(v) => updateData('backgroundColor', v)}
        />
      </Section>

      <Section title="비디오">
        <Select
          label="타입"
          value={data.videoType}
          onChange={(v) => updateData('videoType', v)}
          options={[
            { value: 'youtube', label: 'YouTube' },
            { value: 'url', label: '직접 URL' },
          ]}
        />
        <TextInput
          label="비디오 URL"
          value={data.videoUrl}
          onChange={(v) => updateData('videoUrl', v)}
          placeholder={data.videoType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://...'}
        />
        <TextInput
          label="높이"
          value={data.height}
          onChange={(v) => updateData('height', v)}
          placeholder="500px"
        />
      </Section>

      <Section title="옵션">
        <Toggle
          label="자동 재생"
          value={data.autoPlay}
          onChange={(v) => updateData('autoPlay', v)}
        />
        <Toggle
          label="음소거"
          value={data.muted}
          onChange={(v) => updateData('muted', v)}
        />
        <Toggle
          label="반복"
          value={data.loop}
          onChange={(v) => updateData('loop', v)}
        />
      </Section>
    </div>
  )
}

function DividerProperties({ component, updateData }: {
  component: Extract<Component, { type: 'divider' }>
  updateData: (key: string, value: any) => void
}) {
  const { data } = component

  return (
    <div className="space-y-4">
      <Section title="배경">
        <ColorInput
          label="배경색"
          value={data.backgroundColor}
          onChange={(v) => updateData('backgroundColor', v)}
        />
      </Section>

      <Section title="구분선">
        <TextInput
          label="높이"
          value={data.height}
          onChange={(v) => updateData('height', v)}
          placeholder="40px"
        />
        <Toggle
          label="선 표시"
          value={data.showLine}
          onChange={(v) => updateData('showLine', v)}
        />
        {data.showLine && (
          <>
            <Select
              label="스타일"
              value={data.lineStyle}
              onChange={(v) => updateData('lineStyle', v)}
              options={[
                { value: 'solid', label: '실선' },
                { value: 'dashed', label: '대시' },
                { value: 'dotted', label: '점선' },
              ]}
            />
            <ColorInput
              label="색상"
              value={data.lineColor}
              onChange={(v) => updateData('lineColor', v)}
            />
            <TextInput
              label="두께"
              value={data.lineWidth}
              onChange={(v) => updateData('lineWidth', v)}
              placeholder="1px"
            />
          </>
        )}
      </Section>
    </div>
  )
}

function GridProperties({ component, updateData }: {
  component: Extract<Component, { type: 'grid' }>
  updateData: (key: string, value: any) => void
}) {
  const { data } = component

  const addItem = () => {
    updateData('items', [
      ...data.items,
      { id: `item-${Date.now()}`, image: 'https://via.placeholder.com/80', title: '새 아이템', description: '설명' },
    ])
  }

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...data.items]
    newItems[index] = { ...newItems[index], [field]: value }
    updateData('items', newItems)
  }

  const removeItem = (index: number) => {
    updateData('items', data.items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <Section title="배경">
        <ColorInput
          label="섹션 배경색"
          value={data.backgroundColor}
          onChange={(v) => updateData('backgroundColor', v)}
        />
        <ColorInput
          label="아이템 배경색"
          value={data.itemBackgroundColor}
          onChange={(v) => updateData('itemBackgroundColor', v)}
        />
      </Section>

      <Section title="레이아웃">
        <TextInput
          label="컬럼 수"
          value={data.columns.toString()}
          onChange={(v) => updateData('columns', parseInt(v) || 3)}
          placeholder="3"
        />
        <TextInput
          label="간격"
          value={data.gap}
          onChange={(v) => updateData('gap', v)}
          placeholder="20px"
        />
        <TextInput
          label="아이콘 크기"
          value={data.iconSize}
          onChange={(v) => updateData('iconSize', v)}
          placeholder="80px"
        />
      </Section>

      <Section title="아이템">
        {data.items.map((item, index) => (
          <div key={item.id} className="p-3 border border-gray-200 rounded mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">아이템 {index + 1}</span>
              <button
                onClick={() => removeItem(index)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
              >
                삭제
              </button>
            </div>
            <TextInput
              label="아이콘 URL"
              value={item.image}
              onChange={(v) => updateItem(index, 'image', v)}
            />
            <TextInput
              label="제목"
              value={item.title}
              onChange={(v) => updateItem(index, 'title', v)}
            />
            <TextInput
              label="설명"
              value={item.description}
              onChange={(v) => updateItem(index, 'description', v)}
            />
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded"
        >
          + 아이템 추가
        </button>
      </Section>
    </div>
  )
}

// UI Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function TextInput({ label, value, onChange, placeholder }: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

function TextArea({ label, value, onChange }: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

function ColorInput({ label, value, onChange }: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

function Select({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function Toggle({ label, value, onChange }: {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

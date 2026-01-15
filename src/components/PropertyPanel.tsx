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
      <aside className="w-80 bg-white border-l border-black p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-black">속성</h2>
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
    <aside className="w-80 bg-white border-l border-black p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-black">속성</h2>

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
      {selectedComponent.type === 'table' && (
        <TableProperties 
          component={selectedComponent} 
          updateData={updateData}
          onUpdateComponent={onUpdateComponent}
        />
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
          <ImageInput
            label="이미지 URL"
            value={data.overlayImage}
            onChange={(v) => updateData('overlayImage', v)}
            placeholder="https://... 또는 파일 선택"
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
            <TextArea
              label="텍스트"
              value={data.title}
              onChange={(v) => updateData('title', v)}
            />
            <TextInput
              label="크기"
              value={data.titleSize.replace('px', '')}
              onChange={(v) => updateData('titleSize', v.replace(/[^0-9.]/g, ''))}
              placeholder="48"
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
              label="크기"
              value={data.descriptionSize.replace('px', '')}
              onChange={(v) => updateData('descriptionSize', v.replace(/[^0-9.]/g, ''))}
              placeholder="18"
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
            <Select
              label="텍스트 정렬"
              value={data.descriptionAlign}
              onChange={(v) => updateData('descriptionAlign', v)}
              options={[
                { value: 'left', label: '왼쪽' },
                { value: 'center', label: '가운데' },
                { value: 'right', label: '오른쪽' },
                { value: 'justify', label: '양쪽 정렬' },
              ]}
            />
            <TextInput
              label="자간"
              value={data.descriptionLetterSpacing.replace('px', '')}
              onChange={(v) => updateData('descriptionLetterSpacing', v.replace(/[^0-9.-]/g, ''))}
              placeholder="0"
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
          <ImageInput
            label="이미지 URL"
            value={data.descriptionImage}
            onChange={(v) => updateData('descriptionImage', v)}
            placeholder="https://... 또는 파일 선택"
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
              label="크기"
              value={data.buttonSize.replace('px', '')}
              onChange={(v) => updateData('buttonSize', v.replace(/[^0-9.]/g, ''))}
              placeholder="16"
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
          <div key={index} className="mb-2">
            <ImageInput
              label={`이미지 ${index + 1}`}
              value={image}
              onChange={(v) => updateImage(index, v)}
              placeholder="https://... 또는 파일 선택"
            />
            <button
              onClick={() => removeImage(index)}
              className="mt-1 w-full px-2 py-1 text-sm bg-white text-black border border-black hover:bg-gray-100"
            >
              삭제
            </button>
          </div>
        ))}
        <button
          onClick={addImage}
          className="w-full px-3 py-2 text-sm bg-black text-white border border-black hover:bg-gray-800"
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
        <TextInput
          label="높이"
          value={data.height || 'auto'}
          onChange={(v) => updateData('height', v)}
          placeholder="auto"
        />
      </Section>

      <Section title="아이템">
        {data.items.map((item, index) => (
          <div key={item.id} className="p-3 border border-black mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">아이템 {index + 1}</span>
              <button
                onClick={() => removeItem(index)}
                className="px-2 py-1 text-xs bg-white text-black border border-black hover:bg-gray-100"
              >
                삭제
              </button>
            </div>
            <ImageInput
              label="아이콘 URL"
              value={item.image}
              onChange={(v) => updateItem(index, 'image', v)}
              placeholder="https://... 또는 파일 선택"
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
          className="w-full px-3 py-2 text-sm bg-black text-white border border-black hover:bg-gray-800"
        >
          + 아이템 추가
        </button>
      </Section>
    </div>
  )
}

function TableProperties({ component, updateData, onUpdateComponent }: {
  component: Extract<Component, { type: 'table' }>
  updateData: (key: string, value: any) => void
  onUpdateComponent: (id: string, updates: Partial<Component>) => void
}) {
  const { data } = component

  const addColumn = () => {
    const newColumn = { id: `col-${Date.now()}`, label: '새 컬럼', width: 'auto', textAlign: 'left' }
    const newColumns = [...data.columns, newColumn]
    const newRows = data.rows.map(row => ({
      ...row,
      cells: [...row.cells, ''],
    }))
    // 컬럼과 행을 동시에 업데이트
    onUpdateComponent(component.id, {
      ...component,
      data: {
        ...data,
        columns: newColumns,
        rows: newRows,
      },
    } as any)
  }

  const updateColumn = (index: number, field: string, value: string) => {
    const newColumns = [...data.columns]
    newColumns[index] = { ...newColumns[index], [field]: value }
    updateData('columns', newColumns)
  }

  const removeColumn = (index: number) => {
    if (data.columns.length <= 1) {
      alert('최소 1개의 컬럼이 필요합니다.')
      return
    }
    updateData('columns', data.columns.filter((_, i) => i !== index))
    // 컬럼을 제거할 때 모든 행에서 해당 셀 제거
    updateData('rows', data.rows.map(row => ({
      ...row,
      cells: row.cells.filter((_, i) => i !== index),
    })))
  }

  const addRow = () => {
    updateData('rows', [
      ...data.rows,
      { id: `row-${Date.now()}`, cells: new Array(data.columns.length).fill('') },
    ])
  }

  const updateRowCell = (rowIndex: number, cellIndex: number, value: string) => {
    const newRows = [...data.rows]
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      cells: newRows[rowIndex].cells.map((cell, i) => i === cellIndex ? value : cell),
    }
    updateData('rows', newRows)
  }

  const removeRow = (index: number) => {
    if (data.rows.length <= 1) {
      alert('최소 1개의 행이 필요합니다.')
      return
    }
    updateData('rows', data.rows.filter((_, i) => i !== index))
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
          label="헤더 배경색"
          value={data.headerBackgroundColor}
          onChange={(v) => updateData('headerBackgroundColor', v)}
        />
        <ColorInput
          label="헤더 텍스트 색상"
          value={data.headerTextColor}
          onChange={(v) => updateData('headerTextColor', v)}
        />
        <ColorInput
          label="셀 배경색"
          value={data.cellBackgroundColor}
          onChange={(v) => updateData('cellBackgroundColor', v)}
        />
        <ColorInput
          label="셀 텍스트 색상"
          value={data.cellTextColor}
          onChange={(v) => updateData('cellTextColor', v)}
        />
      </Section>

      <Section title="테두리">
        <ColorInput
          label="테두리 색상"
          value={data.borderColor}
          onChange={(v) => updateData('borderColor', v)}
        />
        <TextInput
          label="테두리 두께"
          value={data.borderWidth}
          onChange={(v) => updateData('borderWidth', v)}
          placeholder="1px"
        />
      </Section>

      <Section title="레이아웃">
        <TextInput
          label="높이"
          value={data.height || 'auto'}
          onChange={(v) => updateData('height', v)}
          placeholder="auto"
        />
      </Section>

      <Section title="컬럼">
        {data.columns.map((column, index) => (
          <div key={column.id} className="p-3 border border-black mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">컬럼 {index + 1}</span>
              <button
                onClick={() => removeColumn(index)}
                className="px-2 py-1 text-xs bg-white text-black border border-black hover:bg-gray-100"
              >
                삭제
              </button>
            </div>
            <TextInput
              label="라벨"
              value={column.label}
              onChange={(v) => updateColumn(index, 'label', v)}
            />
            <TextInput
              label="너비"
              value={column.width || 'auto'}
              onChange={(v) => updateColumn(index, 'width', v)}
              placeholder="auto"
            />
            <Select
              label="텍스트 정렬"
              value={column.textAlign || 'left'}
              onChange={(v) => updateColumn(index, 'textAlign', v)}
              options={[
                { value: 'left', label: '왼쪽' },
                { value: 'center', label: '가운데' },
                { value: 'right', label: '오른쪽' },
                { value: 'justify', label: '양쪽 정렬' },
              ]}
            />
          </div>
        ))}
        <button
          onClick={addColumn}
          className="w-full px-3 py-2 text-sm bg-black text-white border border-black hover:bg-gray-800"
        >
          + 컬럼 추가
        </button>
      </Section>

      <Section title="행">
        {data.rows.map((row, rowIndex) => (
          <div key={row.id} className="p-3 border border-black mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">행 {rowIndex + 1}</span>
              <button
                onClick={() => removeRow(rowIndex)}
                className="px-2 py-1 text-xs bg-white text-black border border-black hover:bg-gray-100"
              >
                삭제
              </button>
            </div>
            {row.cells.map((cell, cellIndex) => (
              <TextArea
                key={cellIndex}
                label={`셀 ${cellIndex + 1} (${data.columns[cellIndex]?.label || ''})`}
                value={cell}
                onChange={(v) => updateRowCell(rowIndex, cellIndex, v)}
              />
            ))}
          </div>
        ))}
        <button
          onClick={addRow}
          className="w-full px-3 py-2 text-sm bg-black text-white border border-black hover:bg-gray-800"
        >
          + 행 추가
        </button>
      </Section>
    </div>
  )
}

// UI Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-black pb-4">
      <h3 className="text-sm font-semibold text-black mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function ImageInput({ label, value, onChange, placeholder }: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    // Reset input so same file can be selected again
    e.target.value = ''
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-2 py-1 text-sm border border-black rounded-none focus:outline-none focus:ring-0"
        />
        <label className="px-3 py-1 text-sm bg-black text-white border border-black hover:bg-gray-800 cursor-pointer whitespace-nowrap">
          파일 선택
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>
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
        className="w-full px-2 py-1 text-sm border border-black rounded-none focus:outline-none focus:ring-0"
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
        className="w-full px-2 py-1 text-sm border border-black rounded-none focus:outline-none focus:ring-0"
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
          className="w-12 h-8 border border-black rounded-none cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-sm border border-black rounded-none focus:outline-none focus:ring-0"
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
        className="w-full px-2 py-1 text-sm border border-black rounded-none focus:outline-none focus:ring-0"
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
        className={`relative inline-flex h-6 w-11 items-center border border-black rounded-full ${
          value ? 'bg-black' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
            value 
              ? 'translate-x-6 bg-white' 
              : 'translate-x-1 bg-gray-500'
          }`}
        />
      </button>
    </div>
  )
}

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Component } from '../types'
import { RenderComponent } from './RenderComponent'

interface CanvasProps {
  components: Component[]
  selectedComponentId: string | null
  onSelectComponent: (id: string | null) => void
  onReorderComponents: (startIndex: number, endIndex: number) => void
  onDeleteComponent: (id: string) => void
}

export function Canvas({
  components,
  selectedComponentId,
  onSelectComponent,
  onReorderComponents,
  onDeleteComponent,
}: CanvasProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    onReorderComponents(result.source.index, result.destination.index)
  }

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      <div className="w-full bg-gray-50 min-h-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="canvas">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`min-h-[400px] p-8 ${
                  snapshot.isDraggingOver ? 'bg-gray-100' : ''
                } ${components.length === 0 ? 'border-2 border-dashed border-black m-6' : ''}`}
              >
                {components.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    왼쪽에서 컴포넌트를 클릭하여 추가하세요
                  </div>
                ) : (
                  components.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-6 relative group ${
                            selectedComponentId === component.id
                              ? 'border-2 border-black'
                              : 'border border-gray-300'
                          } ${snapshot.isDragging ? 'opacity-50' : ''} bg-white`}
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectComponent(component.id)
                          }}
                        >
                          <RenderComponent component={component} />
                          <button
                            className="absolute top-2 right-2 bg-black text-white px-2 py-1 border border-black opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              onDeleteComponent(component.id)
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </main>
  )
}

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
    <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg min-h-full p-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="canvas">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`min-h-[400px] ${
                  snapshot.isDraggingOver ? 'bg-blue-50' : ''
                } ${components.length === 0 ? 'border-2 border-dashed border-gray-300 rounded-lg p-8' : ''}`}
              >
                {components.length === 0 ? (
                  <div className="text-center text-gray-400">
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
                          className={`mb-4 relative group ${
                            selectedComponentId === component.id
                              ? 'ring-2 ring-blue-500 ring-offset-2'
                              : ''
                          } ${snapshot.isDragging ? 'opacity-50' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectComponent(component.id)
                          }}
                        >
                          <RenderComponent component={component} />
                          <button
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
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

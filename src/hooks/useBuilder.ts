import { useState } from 'react'
import { Component } from '../types'

export function useBuilder() {
  const [components, setComponents] = useState<Component[]>([])
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null)

  const addComponent = (component: Component) => {
    setComponents([...components, component])
  }

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } as Component : comp
      )
    )
  }

  const deleteComponent = (id: string) => {
    setComponents(components.filter((comp) => comp.id !== id))
    if (selectedComponentId === id) {
      setSelectedComponentId(null)
    }
  }

  const selectComponent = (id: string | null) => {
    setSelectedComponentId(id)
  }

  const getSelectedComponent = () => {
    return components.find((comp) => comp.id === selectedComponentId)
  }

  const reorderComponents = (startIndex: number, endIndex: number) => {
    const result = Array.from(components)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    setComponents(result)
  }

  const clearAll = () => {
    setComponents([])
    setSelectedComponentId(null)
  }

  return {
    components,
    selectedComponentId,
    addComponent,
    updateComponent,
    deleteComponent,
    selectComponent,
    getSelectedComponent,
    reorderComponents,
    clearAll,
    setComponents,
  }
}

export interface Component {
  id: string
  type: 'text' | 'image' | 'button' | 'container'
  content: string
  styles: {
    width?: string
    height?: string
    padding?: string
    margin?: string
    backgroundColor?: string
    color?: string
    fontSize?: string
    textAlign?: string
    borderRadius?: string
    [key: string]: string | undefined
  }
  children?: Component[]
}

export interface ComponentTemplate {
  type: Component['type']
  label: string
  description: string
  icon: string
  defaultContent: string
  defaultStyles: Component['styles']
}

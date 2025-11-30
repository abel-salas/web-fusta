// Schemas de Sanity para Restaurant La Fusta
// Nota: Usaremos el proyecto de Sanity de web-gavina
// Solo incluimos los schemas que necesitamos para La Fusta
import { menuItem } from './menuItem'
import { homeContent } from './homeContent'
import { menuContent } from './menuContent'
import { contactContent } from './contactContent'
import { hoursContent } from './hoursContent'

export const schemaTypes = [
  // Schemas organizados por página
  homeContent,
  menuContent,
  contactContent,

  // Componentes globales
  hoursContent,

  // Contenido del menú
  menuItem,
]
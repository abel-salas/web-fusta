import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Esquemas que crearemos después
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'restaurant-fusta',
  title: 'Restaurant La Fusta',

  // Credenciales del proyecto desde variables de entorno
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tkwezd48',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schemaTypes as any,
  },

  // Configuración del Studio
  studio: {
    components: {
      // Personalización opcional del Studio
    }
  }
})
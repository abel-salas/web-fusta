#!/usr/bin/env node

const { createClient } = require('@sanity/client');

// Configuración del cliente Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-10-01'
});

async function activateAllMenuItems() {
  try {
    console.log('🔍 Buscando platos del menú...');

    // Obtener todos los platos del menú
    const menuItems = await client.fetch('*[_type == "menuItem"]');

    console.log(`📋 Encontrados ${menuItems.length} platos en total`);

    if (menuItems.length === 0) {
      console.log('⚠️  No se encontraron platos en Sanity');
      return;
    }

    // Filtrar platos que no tienen isActive o está en false
    const itemsToUpdate = menuItems.filter(item =>
      item.isActive === undefined || item.isActive === false
    );

    console.log(`🔄 ${itemsToUpdate.length} platos necesitan ser activados`);

    if (itemsToUpdate.length === 0) {
      console.log('✅ Todos los platos ya están activos');
      return;
    }

    // Crear transacciones para activar todos los platos
    const transaction = client.transaction();

    itemsToUpdate.forEach(item => {
      transaction.patch(item._id).set({ isActive: true });
    });

    // Ejecutar la transacción
    const result = await transaction.commit();

    console.log('✅ Platos activados exitosamente:');
    itemsToUpdate.forEach((item, index) => {
      const name = item.name?.es || item.name?.en || 'Sin nombre';
      const category = item.category || 'Sin categoría';
      console.log(`   ${index + 1}. ${name} (${category})`);
    });

    console.log(`\n🎉 ${itemsToUpdate.length} platos activados correctamente`);
    console.log('🌐 Ahora deberían aparecer en el menú público');

  } catch (error) {
    console.error('❌ Error al activar los platos:', error.message);

    if (error.message.includes('Unauthorized')) {
      console.log('\n💡 Solución: Verifica que el SANITY_API_TOKEN esté configurado correctamente');
    }

    if (error.message.includes('fetch failed')) {
      console.log('\n💡 Solución: Verifica la conexión a internet y los certificados SSL');
    }
  }
}

// Ejecutar el script
console.log('🚀 Iniciando activación de platos del menú...\n');
activateAllMenuItems();
#!/bin/bash

# Script para optimizar imágenes del proyecto web-fusta
# Uso: ./optimize-images.sh [directorio]

IMAGES_DIR=${1:-"public/images"}

echo "🖼️  Optimizando imágenes en $IMAGES_DIR..."

# Crear directorio de respaldo si no existe
mkdir -p backup-images

# Contador de archivos procesados
count=0

# Encontrar y optimizar imágenes JPEG/JPG grandes
find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -size +150k | while read file; do
    echo "📦 Optimizando: $file"
    
    # Crear respaldo si no existe
    backup_file="backup-images/$(basename "$file")"
    if [ ! -f "$backup_file" ]; then
        cp "$file" "$backup_file"
    fi
    
    # Optimizar imagen
    sips -Z 1200 --setProperty formatOptions 75 "$file"
    
    ((count++))
done

# Encontrar y optimizar imágenes PNG grandes
find "$IMAGES_DIR" -type f -iname "*.png" -size +150k | while read file; do
    echo "📦 Optimizando PNG: $file"
    
    # Crear respaldo si no existe
    backup_file="backup-images/$(basename "$file")"
    if [ ! -f "$backup_file" ]; then
        cp "$file" "$backup_file"
    fi
    
    # Para PNG, solo cambiar calidad sin redimensionar demasiado
    sips -Z 1500 "$file"
    
    ((count++))
done

echo "✅ Optimización completada!"
echo "📊 Tamaño total del directorio de imágenes:"
du -sh "$IMAGES_DIR"
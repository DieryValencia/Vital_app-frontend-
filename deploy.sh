#!/bin/bash

# VitalApp Frontend - Deploy Script para Vercel
# Uso: bash deploy.sh

echo "🚀 VitalApp Frontend - Deployment Script"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar git status
echo -e "${BLUE}1️⃣  Verificando Git Status...${NC}"
if [[ -z $(git status -s) ]]; then
    echo -e "${GREEN}✅ Git limpio${NC}"
else
    echo -e "${YELLOW}⚠️  Cambios sin commitear:${NC}"
    git status -s
    read -p "¿Continuar? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi

# 2. Build local
echo ""
echo -e "${BLUE}2️⃣  Build local...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
else
    echo -e "${YELLOW}❌ Build falló${NC}"
    exit 1
fi

# 3. Push a GitHub
echo ""
echo -e "${BLUE}3️⃣  Push a GitHub main...${NC}"
git add .
git commit -m "Pre-deployment: Build check"
git push origin main
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Push exitoso${NC}"
else
    echo -e "${YELLOW}⚠️  Posible conflicto en push${NC}"
fi

# 4. Información para Vercel
echo ""
echo -e "${BLUE}4️⃣  Configuración para Vercel:${NC}"
echo ""
echo -e "${YELLOW}Build Command:${NC}"
echo "  npm run build"
echo ""
echo -e "${YELLOW}Output Directory:${NC}"
echo "  dist"
echo ""
echo -e "${YELLOW}Environment Variables:${NC}"
echo "  VITE_API_URL = [TU_BACKEND_URL]"
echo "  VITE_DEBUG = false"
echo ""

# 5. URLs importantes
echo -e "${BLUE}5️⃣  URLs Importantes:${NC}"
echo ""
echo -e "${YELLOW}Local Development:${NC}"
echo "  http://localhost:5173"
echo ""
echo -e "${YELLOW}Vercel Dashboard:${NC}"
echo "  https://vercel.com/dashboard"
echo ""
echo -e "${YELLOW}Vercel Deployments:${NC}"
echo "  https://vercel.com/[username]/vitalapp-frontend/deployments"
echo ""

# 6. Checklist
echo -e "${BLUE}6️⃣  Pre-Deploy Checklist:${NC}"
echo ""
echo "  [ ] Git push completado"
echo "  [ ] .env.production configurado (local, no en Git)"
echo "  [ ] VITE_API_URL agregado en Vercel"
echo "  [ ] Backend CORS actualizado"
echo "  [ ] Backend deployado"
echo ""

echo -e "${GREEN}✅ Preparado para deployment en Vercel${NC}"
echo ""
echo "Próximos pasos:"
echo "  1. Ir a https://vercel.com/dashboard"
echo "  2. Click 'New Project'"
echo "  3. Seleccionar 'Vital_app-frontend-'"
echo "  4. Configurar Environment Variables"
echo "  5. Click 'Deploy'"
echo ""

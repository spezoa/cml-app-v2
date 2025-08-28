# Deploy en Netlify (SSR con NextAuth + Prisma)
1. Conecta el repo en Netlify (New site from Git).
2. Variables de entorno (Site settings → Environment):
   - DATABASE_URL
   - AZURE_AD_CLIENT_ID
   - AZURE_AD_CLIENT_SECRET
   - AZURE_AD_TENANT_ID
   - NEXTAUTH_URL = https://TU-SITIO.netlify.app
   - NEXTAUTH_SECRET (cadena aleatoria fuerte)
   - NODE_VERSION = 20
3. En Microsoft Entra ID agrega Redirect URI:
   - https://TU-SITIO.netlify.app/api/auth/callback/azure-ad
4. Build:
   - Build command: `npm run build`
   - Publish directory: `.next`

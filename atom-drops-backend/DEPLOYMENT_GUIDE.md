# Atom Drops Backend - Deployment Guide

## ✅ Environment Setup Complete

Your `.env` has been configured with:
- ✅ Neon PostgreSQL database
- ✅ Production settings (NODE_ENV=production)
- ✅ Cloudinary API key for image uploads
- ✅ JWT secret
- ✅ Database migrations applied successfully

## 📋 Deployment Steps

### Option 1: Deploy on Fly.io (Recommended - Free tier available)

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io:**
   ```bash
   flyctl auth login
   ```

3. **Deploy (from project directory):**
   ```bash
   flyctl launch --name atom-drops-backend
   # Choose Node as the builder
   # When asked about Postgres, say NO (you're using Neon)
   ```

4. **Set environment variables:**
   ```bash
   flyctl secrets set \
     DATABASE_URL="postgresql://neondb_owner:npg_EZlGs9ktMAw0@ep-falling-cake-aiql4xfy-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" \
     JWT_SECRET="EALFdHK56bwDUWd6WcKu-x4pKlw7n9m2k5j8h0p3q6r9s2t5u8v1w4x7y0z3a6b9" \
     FRONTEND_URL="https://your-vercel-domain.vercel.app" \
     CLOUDINARY_API_KEY="EALFdHK56bwDUWd6WcKu-x4pKlw" \
     NODE_ENV="production"
   ```

5. **Deploy:**
   ```bash
   flyctl deploy
   ```

6. **Get your app URL:**
   ```bash
   flyctl info
   ```

### Option 2: Deploy on Railway (Even simpler)

1. **Go to railway.app and connect GitHub**
2. **Create new project → Deploy from GitHub**
3. **Select your repo**
4. **Add variables in Railway dashboard:**
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `CLOUDINARY_API_KEY`
   - `NODE_ENV=production`

5. **Railway auto-deploys on push**

### Option 3: Deploy on Koyeb

1. **Go to koyeb.com**
2. **Connect GitHub**
3. **Deploy from GitHub → Select repo**
4. **Set Port: 5000**
5. **Add environment variables**
6. **Deploy**

## 🔗 Update Frontend CORS

Once deployed, update your backend URL in `.env`:

```env
FRONTEND_URL=https://your-vercel-deployed-frontend.vercel.app
```

And in your Vercel frontend, update the API base URL to:
```
https://your-deployed-backend-url
```

## ✅ Database Status

✅ All 3 migrations applied to Neon:
- 20251223153113_init
- 20251226165612_add_slug_optional
- 20251230195853_add_original_price

## 🖼️ Cloudinary Setup

Update these in your `.env` after getting from Cloudinary dashboard:
- `CLOUDINARY_CLOUD_NAME` (get from dashboard)
- `CLOUDINARY_API_SECRET` (get from dashboard)

You already have: `CLOUDINARY_API_KEY=EALFdHK56bwDUWd6WcKu-x4pKlw`

## 🚀 Next Steps

1. Update Cloudinary cloud name and API secret
2. Deploy backend (Fly.io recommended)
3. Get backend URL
4. Update frontend CORS URL
5. Deploy frontend to Vercel
6. Update backend FRONTEND_URL to Vercel domain

Ready to deploy! Which platform do you prefer: Fly.io, Railway, or Koyeb?

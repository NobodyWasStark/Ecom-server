# 🚀 Complete Deployment Guide - Backend to Production

## 🎯 STEP-BY-STEP DEPLOYMENT

### YOUR SETUP

- **Frontend:** https://atom-drops-frontend.vercel.app (Vercel) ✅
- **Database:** Neon PostgreSQL ✅
- **Backend:** Ready to deploy ✅
- **Images:** Cloudinary ✅

---

## 🌩️ OPTION 1: RENDER.COM (Recommended - Easiest & Free)

### Step 1: Go to Render

1. Open https://dashboard.render.com
2. Sign up with GitHub (connect your repo)

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect GitHub → Select `Ecom-server` repo
3. **Root Directory:** `atom-drops-backend`
4. **Build Command:** `npm install && npm run build && npx prisma generate`
5. **Start Command:** `npm start`
6. **Environment:** Node
7. **Plan:** Free

### Step 3: Add Environment Variables

In Render dashboard, add these under "Environment":

```
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_EZlGs9ktMAw0@ep-falling-cake-aiql4xfy-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=EALFdHK56bwDUWd6WcKu-x4pKlw7n9m2k5j8h0p3q6r9s2t5u8v1w4x7y0z3a6b9
FRONTEND_URL=https://atom-drops-frontend.vercel.app
CLOUDINARY_API_KEY=EALFdHK56bwDUWd6WcKu-x4pKlw
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_SECRET=your-api-secret
PORT=5000
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build (~3-5 minutes)
3. Copy the `.onrender.com` URL

### Step 5: Test Backend

```bash
curl https://your-backend-name.onrender.com/health
```

Should return:

```json
{
  "status": "ok",
  "message": "Atom Drops Backend is running correctly",
  "timestamp": "...",
  "environment": "production"
}
```

---

## 🚂 OPTION 2: RAILWAY.APP (Also Easy & Free)

### Step 1: Go to Railway

1. Open https://railway.app
2. Create account with GitHub

### Step 2: Create Project

1. Click "New Project" → "Deploy from GitHub repo"
2. Select `Ecom-server` repo

### Step 3: Configure Service

1. Click "Configure"
2. Set variables under "Variables":

```
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_EZlGs9ktMAw0@ep-falling-cake-aiql4xfy-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=EALFdHK56bwDUWd6WcKu-x4pKlw7n9m2k5j8h0p3q6r9s2t5u8v1w4x7y0z3a6b9
FRONTEND_URL=https://atom-drops-frontend.vercel.app
CLOUDINARY_API_KEY=EALFdHK56bwDUWd6WcKu-x4pKlw
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_SECRET=your-api-secret
PORT=5000
```

3. Click "Deploy"
4. Railway auto-deploys!

---

## 🌍 OPTION 3: KOYEB.COM (Also Free & Simple)

### Step 1: Connect GitHub

1. Go to https://koyeb.com
2. Sign up with GitHub

### Step 2: Deploy

1. Click "Create Web Service"
2. Connect GitHub
3. Select repo and branch
4. **Root:** `atom-drops-backend`
5. **Port:** 5000

### Step 3: Add Variables

Set all environment variables (same as above)

---

## ✅ POST-DEPLOYMENT CHECKLIST

Once deployed:

- [ ] Backend URL obtained (e.g., `backend.onrender.com`)
- [ ] Health check passes
- [ ] Update frontend API base URL to your backend URL
- [ ] Test login endpoint
- [ ] Test product endpoints
- [ ] Verify image uploads work (Cloudinary)

---

## 🔧 QUICK ENVIRONMENT VARIABLES REFERENCE

| Variable                | Value                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`              | `production`                                                                                                                                            |
| `PORT`                  | `5000`                                                                                                                                                  |
| `DATABASE_URL`          | `postgresql://neondb_owner:npg_EZlGs9ktMAw0@ep-falling-cake-aiql4xfy-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `JWT_SECRET`            | `EALFdHK56bwDUWd6WcKu-x4pKlw7n9m2k5j8h0p3q6r9s2t5u8v1w4x7y0z3a6b9`                                                                                      |
| `FRONTEND_URL`          | `https://atom-drops-frontend.vercel.app`                                                                                                                |
| `CLOUDINARY_API_KEY`    | `EALFdHK56bwDUWd6WcKu-x4pKlw`                                                                                                                           |
| `CLOUDINARY_CLOUD_NAME` | `your-cloud-name` (get from Cloudinary)                                                                                                                 |
| `CLOUDINARY_API_SECRET` | `your-api-secret` (get from Cloudinary)                                                                                                                 |

---

## 📸 GET CLOUDINARY CREDENTIALS

1. Go to https://cloudinary.com
2. Sign up free
3. Go to Dashboard
4. Copy:
   - **Cloud Name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → Already have it
   - **API Secret** → `CLOUDINARY_API_SECRET`

---

## 🧪 TEST ENDPOINTS AFTER DEPLOYMENT

### Health Check

```bash
curl https://your-backend-url/health
```

### Register User

```bash
curl -X POST https://your-backend-url/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

### Login

```bash
curl -X POST https://your-backend-url/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

### Get Products

```bash
curl https://your-backend-url/api/v1/products
```

---

## 🔗 UPDATE FRONTEND

Once backend is deployed:

1. Get your backend URL from deployment dashboard
2. In your Vercel frontend code, update API base URL:
   ```javascript
   const API_BASE_URL = "https://your-backend-url";
   ```
3. Redeploy frontend on Vercel

---

## 🆘 TROUBLESHOOTING

| Issue                     | Solution                                                          |
| ------------------------- | ----------------------------------------------------------------- |
| Build fails               | Ensure `npm run build` works locally: `npm run build`             |
| Database connection fails | Check DATABASE_URL has `?sslmode=require&channel_binding=require` |
| CORS errors               | Verify `FRONTEND_URL=https://atom-drops-frontend.vercel.app`      |
| 502 Bad Gateway           | Check logs, might be migrations not running                       |
| Health check fails        | Verify NODE_ENV and PORT variables                                |

---

## 📊 DATABASE STATUS

✅ **Neon PostgreSQL**

- All migrations applied (3/3)
- Ready for production
- Connection tested

---

## 🎉 DEPLOYMENT SUMMARY

Everything is ready! Choose ONE platform above (Render.com recommended) and follow the steps.

**Total time:** ~10 minutes to deploy

**After deployment:** You'll have a fully functional e-commerce backend!

---

**Need help?** Check troubleshooting section above or open an issue on GitHub.

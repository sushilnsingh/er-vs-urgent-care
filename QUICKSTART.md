# ⚡ QUICK START GUIDE

## 🚀 Deploy in 10 Minutes!

### Prerequisites:
- GitHub account ✅
- Text editor (VS Code recommended)
- Git installed

---

## STEP 1: Upload to GitHub (3 minutes)

```bash
# Open terminal/command prompt in project folder
cd er-urgent-care-deployment

# Initialize and push
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/er-vs-urgent-care.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy to Vercel (2 minutes)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your repository
5. Click "Deploy"
6. Wait for build (1-2 minutes)
7. ✅ Your site is live at: `your-project.vercel.app`

---

## STEP 3: Connect Domain (5 minutes)

### In Vercel:
1. Project → Settings → Domains
2. Add: `ervsuregentcare.com`
3. Copy the DNS records shown

### In Hostinger:
1. Login to hPanel
2. Domains → Manage DNS
3. Add A record: `@` → `76.76.21.21`
4. Add CNAME: `www` → `cname.vercel-dns.com`
5. Save and wait 10-30 minutes

---

## ✅ DONE!

Visit https://ervsuregentcare.com

---

## 🆘 Stuck? Common Issues:

**"git: command not found"**
→ Install Git from https://git-scm.com

**"Domain not working"**
→ Wait 30 more minutes for DNS propagation

**"Build failed on Vercel"**
→ Check if all files uploaded to GitHub

---

## 📞 Next Steps:

1. Apply for affiliate programs (see README.md)
2. Set up Google Analytics
3. Replace placeholder links with real affiliate URLs
4. Submit to Google Search Console

For detailed instructions with screenshots, see README.md

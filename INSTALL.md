# PayChase - Installation Instructions

## System Requirements

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code recommended
- **Browser**: Chrome, Firefox, Safari, or Edge

## Check Your System

Run these commands to verify:

```bash
node --version
# Should show v18.0.0 or higher

npm --version
# Should show 9.0.0 or higher

git --version
# Should show any version
```

## Installation Steps

### 1. Install Node.js (if needed)

**Windows:**
- Download from https://nodejs.org
- Run the installer
- Choose "LTS" version
- Restart your terminal

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Clone or Download Project

**Option A: If you have Git**
```bash
git clone YOUR_REPO_URL
cd paychase
```

**Option B: Download ZIP**
- Download the project ZIP
- Extract to a folder
- Open terminal in that folder

### 3. Install Dependencies

```bash
npm install
```

This will install all required packages (~200MB). Takes 2-5 minutes.

**If you see errors:**
- Try: `npm install --legacy-peer-deps`
- Or: `npm cache clean --force` then `npm install`

### 4. Setup Environment Variables

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Now edit `.env` file with your API keys (see QUICK_START.md for details).

### 5. Verify Installation

```bash
npm run dev
```

You should see:
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
- Ready in 2.5s
```

Visit http://localhost:3000 - you should see the landing page!

## Common Installation Issues

### Issue: "node: command not found"
**Solution**: Install Node.js from https://nodejs.org

### Issue: "npm install" fails
**Solution**: 
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
npm run dev -- -p 3001
```

### Issue: "Cannot find module"
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution**: 
```bash
npm run build
# This will show any real errors
```

## IDE Setup (VS Code)

### Recommended Extensions

Install these VS Code extensions:
1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **Prettier - Code formatter**
4. **ESLint**
5. **TypeScript Vue Plugin (Volar)**

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Database Setup

### Supabase

1. Go to https://supabase.com
2. Sign up (free)
3. Create new project
4. Wait 2 minutes for setup
5. Go to SQL Editor
6. Copy SQL from README.md
7. Click "Run"
8. Go to Storage → Create bucket "invoices"
9. Make it public
10. Copy API keys to `.env`

### Verify Database

```bash
# Test connection
curl https://YOUR_PROJECT.supabase.co/rest/v1/invoices \
  -H "apikey: YOUR_ANON_KEY"

# Should return: []
```

## Authentication Setup

### Clerk

1. Go to https://clerk.com
2. Sign up (free)
3. Create new application
4. Choose "Email" authentication
5. Copy API keys to `.env`
6. Add URLs:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

### Verify Auth

1. Run `npm run dev`
2. Visit http://localhost:3000/sign-up
3. Create test account
4. Should redirect to dashboard

## Payment Setup

### Stripe

1. Go to https://stripe.com
2. Sign up (free)
3. Get test API keys (Developers → API Keys)
4. Copy to `.env`
5. Create product:
   - Name: "PayChase Pro"
   - Price: $5/month
   - Copy Price ID to `.env`

### Verify Payments

1. Visit http://localhost:3000/pricing
2. Click "Start Free Trial"
3. Use test card: 4242 4242 4242 4242
4. Should redirect to dashboard

## WhatsApp Setup

### UltraMsg (Recommended)

1. Go to https://ultramsg.com
2. Sign up (free)
3. Connect your WhatsApp:
   - Scan QR code with WhatsApp
   - Wait for connection
4. Get Instance ID and Token
5. Copy to `.env`

### Verify WhatsApp

1. Create invoice with YOUR phone number
2. Click "Send Invoice"
3. Check your WhatsApp
4. Should receive message with PDF

## Troubleshooting Installation

### Clear Everything and Start Fresh

```bash
# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install

# Try running
npm run dev
```

### Check for Conflicting Processes

```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

### Verify Environment Variables

```bash
# Check if .env exists
ls -la .env

# Check if it has content (should not be empty)
cat .env
```

### Update Dependencies

```bash
# Update npm
npm install -g npm@latest

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

## Post-Installation Checklist

- [ ] Node.js installed (v18+)
- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] `.env` file created and filled
- [ ] Supabase project created
- [ ] Database tables created
- [ ] Storage bucket created
- [ ] Clerk app created
- [ ] Stripe account created
- [ ] WhatsApp provider connected
- [ ] `npm run dev` works
- [ ] Can access http://localhost:3000
- [ ] Can sign up
- [ ] Can create invoice
- [ ] Can send WhatsApp message

## Next Steps

After successful installation:

1. **Test Everything**: Follow [TESTING_GUIDE.md](TESTING_GUIDE.md)
2. **Customize**: Update branding, colors, text
3. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Go Live**: Switch to live API keys

## Getting Help

If you're stuck:

1. Check [QUICK_START.md](QUICK_START.md)
2. Review [README.md](README.md)
3. Check service dashboards:
   - Clerk: https://dashboard.clerk.com
   - Supabase: https://app.supabase.com
   - Stripe: https://dashboard.stripe.com
   - UltraMsg: https://ultramsg.com
4. Check browser console for errors (F12)
5. Check terminal for error messages

## System-Specific Notes

### Windows

- Use PowerShell or Command Prompt
- Paths use backslashes: `app\page.tsx`
- Use `copy` instead of `cp`
- Use `del` instead of `rm`

### Mac

- Use Terminal
- May need to use `sudo` for global installs
- Paths use forward slashes: `app/page.tsx`

### Linux

- Use Terminal
- May need to use `sudo` for global installs
- Ensure Node.js is in PATH

## Performance Tips

### Speed Up npm install

```bash
# Use npm ci for faster installs
npm ci

# Or use pnpm (faster alternative)
npm install -g pnpm
pnpm install
```

### Speed Up Development

```bash
# Use turbo for faster builds
npm install -g turbo
turbo dev
```

## Security Notes

- Never commit `.env` file
- Keep API keys secret
- Use test keys for development
- Switch to live keys only in production
- Regularly update dependencies

## Maintenance

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install package-name@latest
```

### Clean Build

```bash
# Remove build artifacts
rm -rf .next

# Rebuild
npm run build
```

---

**Installation complete? Start with [QUICK_START.md](QUICK_START.md) to begin using PayChase!**

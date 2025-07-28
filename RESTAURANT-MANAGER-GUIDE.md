# 🍜 Vienna Ramen Guide - Enhanced Restaurant Manager

## 🚀 NEW: Fully Automated Restaurant Management!

**No more copy-pasting!** The Vienna Ramen Guide now features a complete web-based restaurant manager with direct GitHub integration.

### ✨ Key Features

✅ **Direct GitHub Integration** - Save directly to your repository  
✅ **One-click Operations** - Add, edit, delete restaurants instantly  
✅ **Real-time Sync** - Changes appear on your website immediately  
✅ **User-friendly Interface** - No JSON editing required  
✅ **Mobile Responsive** - Manage restaurants on any device  
✅ **Automatic Backups** - Download your data anytime  
✅ **Secure Authentication** - GitHub Personal Access Token  

---

## 🎯 Quick Start (5 minutes)

### Step 1: Setup GitHub Token (One-time)

1. **Go to GitHub Settings**: [Personal Access Tokens](https://github.com/settings/tokens)
2. **Click "Generate new token"** → "Generate new token (classic)"
3. **Configure your token**:
   - Name: `Vienna Ramen Manager`
   - Expiration: `No expiration` (or your preference)
   - **Permissions**: Check `repo` (Full control of private repositories)
4. **Copy your token** (starts with `ghp_`)

### Step 2: Access the Restaurant Manager

**🔗 Open the Manager**: [restaurant-manager.html](./restaurant-manager.html)

### Step 3: Connect & Start Managing

1. **Paste your GitHub token** in the setup form
2. **Click "Connect GitHub"**
3. **Start managing!** ✨

---

## 📱 How to Use

### 🏪 View All Restaurants
- **Automatically loads** from your GitHub repository
- **Live data** - always up to date
- **Mobile-friendly** cards with all details

### ➕ Add New Restaurant
1. Click **"Add New Restaurant"**
2. Fill out the form (required fields marked with *)
3. Click **"Save Restaurant"**
4. **Done!** Your website updates automatically

### ✏️ Edit Existing Restaurant
1. Find the restaurant in the list
2. Click **"Edit"** button
3. Modify any information
4. Click **"Save Restaurant"**
5. **Done!** Changes are live immediately

### 🗑️ Delete Restaurant
1. Find the restaurant in the list
2. Click **"Delete"** button
3. Confirm deletion
4. **Done!** Restaurant removed from website

### 💾 Backup Your Data
- Click **"Backup Data"** anytime
- Downloads JSON file with all restaurants
- Keep your data safe!

---

## 🔧 Advanced Features

### 🔄 Real-time Sync
- **Automatic updates** - No manual file editing
- **Instant deployment** - Changes go live immediately
- **Version control** - All changes tracked in Git history

### 🛡️ Security & Privacy
- **Token stored locally** - Never sent to third parties
- **GitHub authentication** - Secure API access
- **No data collection** - Everything stays in your GitHub

### 📱 Mobile Support
- **Responsive design** - Works on all devices
- **Touch-friendly** - Easy mobile management
- **Offline capable** - View existing data without connection

### 🔧 Error Handling
- **Network issues** - Graceful fallback and retry
- **Validation** - Prevents invalid data
- **User feedback** - Clear success/error messages

---

## 📁 Files Overview

| File | Purpose |
|------|---------|
| **restaurant-manager.html** | Main management interface |
| **restaurant-manager.css** | Beautiful, responsive styling |
| **restaurant-manager.js** | GitHub API integration & logic |
| **restaurants.json** | Your restaurant data (auto-managed) |
| **integrations-code.js** | Website integration code |

---

## 🆘 Troubleshooting

### ❌ "Failed to connect to GitHub"
- **Check token**: Make sure it starts with `ghp_` or `github_pat_`
- **Check permissions**: Token needs `repo` access
- **Check expiration**: Make sure token hasn't expired

### ❌ "Failed to save restaurants"
- **Internet connection**: Check your network
- **Token permissions**: Ensure `repo` access is granted
- **Repository access**: Make sure token can access this repository

### ❌ "Changes not appearing on website"
- **Wait a moment**: GitHub Pages may take 1-2 minutes to update
- **Check browser cache**: Refresh your website (Ctrl+F5)
- **Verify save**: Check if the commit appeared in GitHub

### 🔄 Need to Reset?
1. Click **"Disconnect"** in the manager
2. Clear your browser data (optional)
3. Start fresh with **"Connect GitHub"**

---

## 🎨 Customization

### 🏷️ Adding Custom Tags
Use descriptive words that help visitors find restaurants:
- **Atmosphere**: cozy, modern, traditional, trendy
- **Style**: authentic, fusion, casual, upscale
- **Special**: family-friendly, date-night, quick-bite, popular

### 💰 Price Ranges
- **€** - Budget-friendly (under 15€)
- **€€** - Moderate (15-25€)
- **€€€** - Premium (25€+)

### 📝 Writing Descriptions
- **Keep it short**: 1-2 sentences
- **Highlight uniqueness**: What makes this place special?
- **Include atmosphere**: Help visitors know what to expect

---

## 🔄 Migration from Old System

### If You Were Using Manual JSON Editing:
✅ **No action needed!** The new manager works with your existing data.

✅ **All your restaurants** are automatically loaded.

✅ **Everything still works** as before, just better!

---

## 📞 Support

### 🐛 Found a Bug?
Open an issue in this repository with:
- What you were trying to do
- What happened instead
- Browser and device information

### 💡 Feature Request?
Open an issue and describe your idea!

### 🤝 Contributing
Pull requests welcome! Please test your changes thoroughly.

---

**🍜 Happy Restaurant Managing! ✨**

*Built with love for the Vienna ramen community*
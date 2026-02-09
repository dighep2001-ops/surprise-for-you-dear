# Deploy to Vercel → https://surprise-for-you-dear.vercel.app

## Step 1: Push your code to GitHub

1. Open PowerShell in the **valentine-love** folder:
   ```powershell
   cd C:\Users\DELL\Desktop\Valentine\valentine-love
   ```

2. If you haven’t already, init and push:
   ```powershell
   git init
   git add .
   git commit -m "Valentine surprise"
   ```

3. On [github.com](https://github.com) create a **New repository** (e.g. name: `surprise-for-you-dear`).

4. Link and push (replace `YOUR_USERNAME` with your GitHub username):
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/surprise-for-you-dear.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).

2. Click **Add New…** → **Project**.

3. **Import** your GitHub repo (e.g. `surprise-for-you-dear`).

4. **Project Name:**  
   - If you named the repo `surprise-for-you-dear`, the project name will be that and your URL will be **https://surprise-for-you-dear.vercel.app**.  
   - If the name is different, after the first deploy go to **Project → Settings → General → Project Name**, set it to **surprise-for-you-dear**, and save. The URL will update to **https://surprise-for-you-dear.vercel.app**.

5. Leave **Build Command** and **Output Directory** as suggested by Vercel (they use your `vercel.json`). Click **Deploy**.

## Step 3: Share the link

When the deploy finishes, your link will be:

**https://surprise-for-you-dear.vercel.app**

Send that to her. The tab title will show **“Surprise for you dear”**.

---

**Note:** Your MP3 and MP4 in the `public` folder are included in the build and will work on this URL.

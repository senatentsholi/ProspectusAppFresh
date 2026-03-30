# Limkokwing University Prospectus App

A React Native / Expo mobile application for exploring Limkokwing University's faculties, courses, and career quiz.

---

## 📱 Features

- **Home Screen** – Logo, search bar, quick-access buttons
- **Faculties Screen** – 5 faculties displayed in a colourful 2-column grid
- **Courses Screen** – Course list per faculty with search filter
- **Course Detail Screen** – Course image, description, embedded YouTube video, and star rating
- **Career Quiz** – 10-question quiz with personalised faculty recommendation
- **Search Screen** – Search all 25 courses across all faculties

---

## 🚀 Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Add your assets

Place the following files in `assets/`:
- `background.jpg` – Background image used on all screens
- `icon.jpg` – App logo shown on Home screen

Place the following files in `assets/images/`:
```
it_degree.jpg
software_multimedia_degree.jpg
business_it_degree.jpg
it_diploma.jpg
business_it_diploma.jpg
intl_business_degree.jpg
entrepreneurship_degree.jpg
hrm_degree.jpg
business_mgmt_diploma.jpg
retail_mgmt_diploma.jpg
creative_ad_diploma.jpg
graphic_design_diploma.jpg
fashion_apparel_diploma.jpg
fashion_retailing_ba.jpg
graphic_design_ba.jpg
broadcasting_journalism_degree.jpg
prof_communication_degree.jpg
tv_film_diploma.jpg
pr_diploma.jpg
journalism_media_diploma.jpg
arch_studies_bachelor.jpg
interior_arch_ba.jpg
arch_tech_diploma.jpg
urban_planning_ba.jpg
sustainable_design_ba.jpg
```

> Tip: You can use any relevant placeholder images (e.g. from Unsplash or Pexels) named accordingly.

### 3. Start the app

```bash
npx expo start
```

Then scan the QR code with **Expo Go** (iOS/Android) or press `a` for Android emulator / `i` for iOS simulator.

---

## 🎥 Video Playback

Videos are embedded via YouTube using `react-native-webview`. Each course has a `videoId` in `data/faculties.js` — these are standard YouTube video IDs.

To change a video, update the `videoId` field in `data/faculties.js` with any YouTube video ID (e.g. `dQw4w9WgXcQ`).

**Requirements:** Internet connection is needed for videos to play.

---

## 🗂 Project Structure

```
prospectusapp/
├── App.js                  # Navigation setup
├── index.js                # Entry point
├── app.json                # Expo config
├── package.json
├── babel.config.js
├── assets/
│   ├── background.jpg      # ← Add your background image
│   ├── icon.jpg            # ← Add your app icon/logo
│   └── images/             # ← Add your 25 course images here
├── constants/
│   └── theme.js            # Colors and sizes
├── data/
│   └── faculties.js        # All faculty & course data (with videoIds)
└── screens/
    ├── HomeScreen.js
    ├── FacultyScreen.js
    ├── CourseScreen.js
    ├── CourseDetailScreen.js
    ├── QuizScreen.js
    └── SearchScreen.js
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `expo` | App framework |
| `@react-navigation/native` | Navigation |
| `react-native-webview` | YouTube video embedding |
| `@react-native-async-storage/async-storage` | Saving course ratings locally |
| `@expo/vector-icons` | Material icons throughout the app |

---

## 🎨 Theme

All colours and sizes are in `constants/theme.js`. The app uses a dark navy theme (`#0A0F1E`) with orange accents (`#FF8C00`).

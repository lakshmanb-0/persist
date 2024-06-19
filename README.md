# News Website README

## Introduction

Welcome to our News Website! This platform is designed to provide the latest news, insightful articles, and engaging multimedia content on a wide range of topics. Our mission is to deliver accurate, timely, and comprehensive news to our audience.

<img src="https://i.postimg.cc/vTbZzGVd/245-1x-shots-so.png" alt='header' />

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Usage](#usage)
4. [Installation](#installation)

## Features

- **Search:** Easily find articles on topics of interest.
- **Favorite or Liked Articles:** Save articles to your favorites for easy access later.
- **Select Category:** Browse news by specific categories such as Games, Film, Tv, etc.
- **Pagination:** Navigate through articles efficiently with pagination.
- **GameSpot API:** Fetch gaming news and articles using the GameSpot API.
- **Responsive Design:** Optimized for viewing on both desktop and mobile devices.

## Tech Stack

- **React.js:** For building the user interface.
- **React Router:** For handling navigation.
- **Redux Toolkit:** For state management.
- **Tailwind CSS:** For styling.
- **Ant Design:** For prebuilt components.
- **Optimized Hooks:** Using `useMemo` and `useCallback` to prevent unnecessary re-renders.

## Usage

- **Home Page:** Browse the latest headlines and top stories.
- **Article Pages:** Read detailed news articles.
- **Search:** Use the search bar to find specific articles.
- **Favorites:** Save articles to your favorites for easy access later.
- **Pagination:** Navigate through multiple pages of articles.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lakshmanb-0/persist.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd persist
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add your API key:

   ```plaintext
   VITE_NEWS_API_KEY='your_api_key from https://www.gamespot.com/api/'
   ```

5. **Start the development server:**

   ```bash
   npm start
   ```

The website should now be running on `http://localhost:3000`.

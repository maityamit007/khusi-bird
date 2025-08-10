# Khusi Bird

A fun browser-based game built with [Kaplay](https://github.com/replit/kaplay) and Tauri.

## Features

- Playable in the browser or as a desktop app (via Tauri)
- Pixel-art graphics and smooth animations
- Save system for high scores
- Responsive design

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Rust](https://www.rust-lang.org/tools/install) (for Tauri desktop builds)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites/) (for desktop builds)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/khusi-bird.git
   cd khusi-bird
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the Game (Web)

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to play.

### Building for Production (Web)

```sh
npm run build
```
The output will be in the `dist/` folder.

### Running as a Desktop App (Tauri)

1. **Install Rust and Tauri CLI** (if not already done):
   ```sh
   cargo install tauri-cli
   ```

2. **Run the Tauri app:**
   ```sh
   npm run tauri dev
   ```

3. **Build the Tauri app:**
   ```sh
   npm run tauri build
   ```

## Project Structure

```
├── public/         # Static assets (images, sprites, etc.)
├── src/            # Game source code (JavaScript)
├── src-tauri/      # Tauri (Rust) backend for desktop builds
├── index.html      # Main HTML file
├── package.json    # Project metadata and scripts
└── README.md       # This file
```
Enjoy playing Khusi Bird!
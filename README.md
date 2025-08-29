# DiscoCipher 🪩

A fun web application that transforms text by sorting the letters in each word alphabetically while preserving punctuation and spacing. Built with TypeScript, Vite, and disco vibes!

## ✨ Features

- **Real-time transformation**: Type in the input textarea and see results instantly
- **Disco-themed UI**: Groovy animations and colorful gradients
- **Comprehensive testing**: Full test suite with Vitest
- **TypeScript**: Type-safe development
- **Static site generation**: Builds to deployable static files
- **CI/CD**: GitHub Actions for testing, linting, and deployment

## 🕺 How it works

DiscoCipher sorts the letters in each word alphabetically while keeping punctuation and spaces in their original positions.

**Example:**
```
Input:  "Hi, my name is Dave!"
Output: "Hi, my aemn is aDev!"
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/disco-cipher.git
cd disco-cipher

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🧪 Testing

The project includes comprehensive tests for the core DiscoCipher function:

```bash
npm run test
```

Test cases cover:
- Basic word sorting
- Multiple words
- Punctuation handling
- Numbers and special characters
- Case sensitivity
- Edge cases

## 🚀 Deployment

The project is configured for GitHub Pages deployment via GitHub Actions. When you push to the `main` branch:

1. Tests and linting run automatically
2. If successful, the app builds and deploys to GitHub Pages
3. Your site will be available at `https://yourusername.github.io/`

## 🎨 Development

### Project Structure

```
disco-cipher/
├── src/
│   ├── discoCipher.ts       # Core transformation logic
│   ├── discoCipher.test.ts  # Test suite
│   ├── main.ts              # App initialization
│   └── style.css            # Disco-themed styles
├── public/
│   └── disco-ball.svg       # Favicon
├── .github/workflows/
│   └── ci.yml               # GitHub Actions CI/CD
├── index.html               # Main HTML template
└── package.json             # Dependencies and scripts
```

### Adding New Features

1. Add your feature to `src/discoCipher.ts`
2. Write tests in `src/discoCipher.test.ts`
3. Update the UI in `src/main.ts` if needed
4. Run tests: `npm test`
5. Check types: `npm run typecheck`
6. Lint code: `npm run lint`

## 🎭 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning and fun!

---

Made with ✨ and disco vibes 🕺
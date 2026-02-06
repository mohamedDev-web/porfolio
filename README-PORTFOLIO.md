# Professional Portfolio Website

A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. This portfolio showcases a developer's skills, projects, experience, and provides a contact form for potential clients or employers.

## ✨ Features

### 🎨 Frontend Features
- **Modern Design**: Clean, professional UI with Tailwind CSS and shadcn/ui components
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Engaging scroll animations and micro-interactions
- **SEO Optimized**: Semantic HTML5 structure and proper meta tags
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### 📱 Sections
- **Hero**: Eye-catching introduction with call-to-action buttons
- **About Me**: Personal bio, skills, and technology stack
- **Projects**: Featured projects with filtering and detailed information
- **Experience**: Work and education timeline
- **Contact**: Functional contact form with validation

### 🚀 Backend Features
- **RESTful API**: Next.js API routes for data management
- **Database**: SQLite with Prisma ORM for data persistence
- **Contact Form**: Stores messages in database with validation
- **Type Safety**: Full TypeScript implementation

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **State Management**: React Hooks

### Backend
- **API**: Next.js API Routes
- **Database**: SQLite
- **ORM**: Prisma
- **Validation**: Custom validation logic

### Development Tools
- **Package Manager**: Bun
- **Linting**: ESLint with Next.js rules
- **Code Formatting**: Prettier (configured)

## 📁 Project Structure

```
my-project/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   │   ├── contact/  # Contact form API
│   │   │   ├── projects/ # Projects API
│   │   │   ├── experience/ # Experience API
│   │   │   └── profile/  # Profile API
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main portfolio page
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── lib/
│   │   ├── db.ts         # Database client
│   │   └── utils.ts      # Utility functions
│   └── hooks/            # Custom React hooks
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── db/                   # SQLite database
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up the database**
   ```bash
   bun run db:push
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the portfolio.

## 📝 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run db:push` - Push database schema changes
- `bun run db:studio` - Open Prisma Studio

## 🎨 Customization

### Personal Information
Update the portfolio content in `src/app/page.tsx`:

1. **Personal Details**: Modify the hero section with your name, title, and bio
2. **Contact Info**: Update email, location, and social links
3. **Skills**: Add or remove skills in the skills array
4. **Projects**: Replace with your actual projects
5. **Experience**: Update with your work and education history

### Styling
- **Colors**: Modify CSS variables in `src/app/globals.css`
- **Typography**: Update font families and sizes
- **Animations**: Adjust animation timings and effects

### API Endpoints
The portfolio includes the following API endpoints:

- `GET/POST /api/contact` - Contact form submissions
- `GET/POST /api/projects` - Project management
- `GET/POST /api/experience` - Experience data
- `GET/POST /api/profile` - Profile information

## 🌱 Database Schema

The application uses the following models:

- **Profile**: Personal information and links
- **Project**: Portfolio projects with metadata
- **Experience**: Work and education history
- **ContactMessage**: Contact form submissions

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🌙 Dark Mode

Dark mode is implemented with:
- **Toggle**: Switch in the top-right corner
- **Persistence**: User preference saved in localStorage
- **System Detection**: Respects OS color scheme preference

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS Amplify

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL="file:./db/custom.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
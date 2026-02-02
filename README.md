# Formly - Advanced Form Builder

A modern, full-featured form builder application that allows users to create, customize, publish, and manage forms with a powerful drag-and-drop interface. Built with Next.js 14, featuring real-time form submissions tracking and analytics.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)

## ✨ Features

### 🎨 Visual Form Designer
- **Drag-and-drop interface** powered by @dnd-kit for intuitive form building
- **Live preview** mode to see forms as users will experience them
- **Real-time editing** with instant visual feedback
- **11 customizable field types**: Text, Number, Date, Select, Checkbox, TextArea, Title, Subtitle, Paragraph, Separator, Spacer

### 📊 Form Management
- **Form analytics dashboard** - Track visits, submissions, submission rate, and bounce rate
- **Shareable form URLs** - Unique UUID-based links for public access
- **Publish/unpublish workflow** - Control form availability
- **Form submissions tracking** - View and manage all form responses

### 🎯 Field Customization
- Required/optional field configuration
- Custom labels and helper text
- Placeholder text customization
- Field-specific validation rules
- Responsive design for all devices

### 🔐 Authentication & Security
- Secure authentication via **Clerk**
- Protected routes with middleware
- User-scoped forms and data isolation

### 🌙 User Experience
- **Dark/Light mode** support with next-themes
- Responsive design for mobile and desktop
- Loading states and error boundaries
- Toast notifications for user feedback
- Confetti celebration on form publish

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality UI components
- **[@dnd-kit](https://dndkit.com/)** - Modern drag-and-drop toolkit

### Backend & Database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Clerk](https://clerk.com/)** - Authentication and user management

### Form & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Additional Libraries
- **lucide-react** - Icon library
- **react-icons** - Additional icon sets
- **date-fns** - Date manipulation
- **react-confetti** - Celebration animations
- **nextjs-toploader** - Page transition loader

## 🏗️ Architecture

### Route Structure
```
app/
├── (auth)/              # Public authentication routes
│   ├── sign-in/         # Clerk sign-in page
│   └── sign-up/         # Clerk sign-up page
├── (dashboard)/         # Protected user routes
│   ├── page.tsx         # Dashboard with stats
│   ├── builder/[id]/    # Form designer interface
│   ├── forms/[id]/      # Form submissions viewer
│   └── submit/[formUrl] # Public form submission page
```

### Component Architecture

**Form Element Plugin System** - Each field type implements:
- `construct` - Factory function for new instances
- `designerComponent` - How it appears in the designer
- `formComponent` - How it renders on the live form
- `propertiesComponent` - Configuration panel
- `validate` - Validation logic

**State Management** - DesignerContext provides:
- `elements` - Array of form field instances
- `selectedElement` - Currently selected element
- `addElements()` - Insert elements at specific positions
- `removeElement()` - Delete elements by ID
- `updateElement()` - Modify element properties

### Database Schema
```prisma
Form {
  id          Int       # Auto-increment ID
  userId      String    # Clerk user ID
  name        String    # Form name
  description String    # Form description
  content     String    # JSON-serialized form structure
  published   Boolean   # Publication status
  shareUrl    String    # Unique UUID for public access
  visits      Int       # Visit counter
  submissions Int       # Submission counter
}

FormSubmission {
  id        Int       # Auto-increment ID
  formId    Int       # Reference to Form
  content   String    # JSON-serialized submission data
  createdAt DateTime  # Submission timestamp
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Clerk account ([sign up free](https://clerk.com))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd form_builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# PostgreSQL Database
POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/database?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host:5432/database"
```

4. **Set up the database**
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
form_builder/
├── actions/              # Server Actions
│   └── Form.ts          # Form CRUD operations
├── app/                 # Next.js App Router
│   ├── (auth)/         # Authentication pages
│   ├── (dashboard)/    # Protected app pages
│   └── layout.tsx      # Root layout with providers
├── components/
│   ├── context/        # React Context providers
│   ├── fields/         # Form field implementations
│   ├── hooks/          # Custom React hooks
│   ├── others/         # Core builder components
│   ├── provider/       # Theme provider
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
│   ├── prisma.ts       # Prisma client singleton
│   ├── utils.ts        # Helper utilities
│   └── IdGenerator.ts  # Unique ID generation
├── prisma/
│   └── schema.prisma   # Database schema
├── Schemas/            # Zod validation schemas
└── middleware.ts       # Clerk authentication middleware
```

## 🔑 Key Workflows

### Creating a Form
1. User logs in via Clerk authentication
2. Dashboard displays form stats and existing forms
3. Click "Create Form" → Fill name and description
4. Redirected to drag-and-drop form builder

### Building a Form
1. Drag field types from left sidebar to canvas
2. Click field to edit properties in right sidebar
3. Rearrange fields by dragging within canvas
4. Preview form with "Preview" button
5. Save draft with "Save" button
6. Publish when ready (becomes read-only)

### Form Submissions
1. Share form via unique URL (`/submit/[formUrl]`)
2. Visitors fill out and submit form
3. Submissions stored in database
4. View submissions in `/forms/[id]` page
5. Track analytics on dashboard

## 🎨 Adding Custom Fields

To add a new form field type:

1. **Create field component** in `components/fields/`
```typescript
// components/fields/CustomField.tsx
export const CustomFieldFormElement: FormElement = {
  type: "CustomField",
  construct: (id: string) => ({ id, type: "CustomField", extraAttributes }),
  designerBtnElements: { icon: IconComponent, label: "Custom Field" },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (instance, value) => boolean,
};
```

2. **Register in FormElements.tsx**
```typescript
import { CustomFieldFormElement } from "../fields/CustomField";

export type ElementsType = 
  | "TextField"
  | "CustomField"  // Add here
  | ...

export const FormElements: FormElementsType = {
  CustomField: CustomFieldFormElement,  // Add here
  ...
};
```

## 🧪 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev --name <name>  # Create new migration
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Setup
- Set up PostgreSQL database (Vercel Postgres, Supabase, etc.)
- Configure Clerk production keys
- Ensure all environment variables are set

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

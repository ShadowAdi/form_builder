# Copilot Instructions for Form Builder

## Project Overview
This is a **Next.js 14 (App Router)** form builder application using **Clerk** for authentication, **Prisma** with PostgreSQL, **@dnd-kit** for drag-and-drop, and **shadcn/ui** components. Users can create, design, publish, and manage forms with real-time submissions tracking.

## Architecture & Key Patterns

### Route Organization
- `app/(auth)/*` - Public authentication pages (Clerk sign-in/sign-up)
- `app/(dashboard)/*` - Protected routes requiring authentication
  - `builder/[id]` - Form designer interface
  - `forms/[id]` - View form submissions
  - `submit/[formUrl]` - Public form submission pages (uses shareUrl)

### Form Element System
All form field types follow a **consistent plugin architecture** defined in [components/others/FormElements.tsx](components/others/FormElements.tsx):

```typescript
export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;  // Factory for new instances
  designerBtnElements: { icon, label };             // Sidebar button config
  designerComponent: React.FC;                       // How it looks in designer
  formComponent: React.FC;                           // How it renders on live form
  propertiesComponent: React.FC;                     // Right sidebar properties panel
  validate: (instance, value) => boolean;           // Validation logic
}
```

**When adding new field types:**
1. Create file in `components/fields/<FieldName>Field.tsx`
2. Export a `<FieldName>FormElement: FormElement` object
3. Register in `FormElements` map in [FormElements.tsx](components/others/FormElements.tsx)
4. Add type to `ElementsType` union

### Designer Context ([components/context/DesignerContext.tsx](components/context/DesignerContext.tsx))
Centralized state management for the form builder:
- `elements` - Array of form field instances currently in the designer
- `selectedElement` - Currently selected element for property editing
- `addElements(index, element)` - Insert at specific position
- `removeElement(id)` - Delete by ID
- `updateElement(id, element)` - Replace element properties

### Drag-and-Drop Flow (@dnd-kit)
1. **Sidebar buttons** ([SidebarButtonElements.tsx](components/others/SidebarButtonElements.tsx)) - Draggable sources with `data: { isDesignerBtnElement: true, type }`
2. **Designer canvas** ([Designer.tsx](components/others/Designer.tsx)) - Drop zone handling `onDragEnd` events
3. **Element wrappers** ([DesignerElementWrapper.tsx](components/others/DesignerElementWrapper.tsx)) - Individual draggable/droppable items with top/bottom half detection
4. **DragOverlay** ([DragOverlayWrapper.tsx](components/others/DragOverlayWrapper.tsx)) - Visual feedback during drag

### Database Schema (Prisma)
```prisma
Form {
  content: String  // JSON stringified FormElementInstance[]
  shareUrl: String // UUID for public submissions
  published: Boolean
  FormSubmission[] // One-to-many relationship
}

FormSubmission {
  content: String  // JSON stringified submission data
  formId: Int
}
```

### Server Actions Pattern ([actions/Form.ts](actions/Form.ts))
All data mutations use Next.js Server Actions with `"use server"`:
- Always check `currentUser()` from Clerk first
- Use Zod schemas from `Schemas/` for validation
- Throw custom errors (e.g., `UserNotFoundError`)
- Example: `CreateFormServer(data: formSchemaType)`

## Development Workflows

### Setup & Running
```bash
npm install
npm run dev  # Starts on localhost:3000
npx prisma generate  # After schema changes (auto-runs on postinstall)
npx prisma migrate dev  # Create new migration
```

### Environment Variables Required
```env
# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Postgres database
POSTGRES_PRISMA_URL       # Connection pool
POSTGRES_URL_NON_POOLING  # Direct connection
```

## Project-Specific Conventions

### File Naming
- Field components: `<Name>Field.tsx` (e.g., `TextField.tsx`)
- Server actions: PascalCase async functions (e.g., `GetFormStats`, `CreateFormServer`)
- UI components: kebab-case filenames (e.g., `alert-dialog.tsx`)

### Component Structure
- **"use client"** directive required for:
  - All context consumers (DesignerContext)
  - Components using @dnd-kit hooks
  - Components with React state/effects
- **Server components** by default for pages fetching data

### Form Content Storage
- Designer state (`FormElementInstance[]`) serialized as JSON string in `Form.content`
- Deserialize in `FormBuilder` on mount: `JSON.parse(form.content)`
- Each element has `id` from `IdGenerator()` (random 0-10000)

### Styling Approach
- Tailwind CSS with `cn()` utility from [lib/utils.ts](lib/utils.ts)
- Dark mode support via `next-themes` (see [components/provider/themeprovider.tsx](components/provider/themeprovider.tsx))
- Theme toggle in components using `useTheme()` hook

### Validation Pattern
- Field-level validation in each `FormElement.validate()` method
- Properties panels use `react-hook-form` + Zod resolver
- Server-side validation in actions using Zod schemas

## Common Tasks

### Adding a New Form Field
1. Copy existing field as template (e.g., [TextField.tsx](components/fields/TextField.tsx))
2. Define `extraAttributes` schema and Zod validation
3. Implement 4 required components: Designer, Form, Properties, validate
4. Export as `<Name>FormElement` and register in `FormElements`

### Modifying Form Builder UI
- Top toolbar: [FormBuilder.tsx](components/others/FormBuilder.tsx) (Preview/Save/Publish buttons)
- Left sidebar: [DesignerSidebar.tsx](components/others/DesignerSidebar.tsx) (field palette)
- Right sidebar: [PropertiesElementSidebar.tsx](components/others/PropertiesElementSidebar.tsx) (properties panel)
- Canvas: [Designer.tsx](components/others/Designer.tsx)

### Working with Form Submissions
- Public submission route: `app/(dashboard)/submit/[formUrl]/page.tsx`
- Submissions table: [SubmissionsTable.tsx](components/others/SubmissionsTable.tsx)
- Data flow: Form submit → Server Action → Prisma → FormSubmission table

## Key Dependencies
- **@clerk/nextjs** - Authentication middleware in [middleware.ts](middleware.ts)
- **@dnd-kit/core** - All drag-and-drop behavior
- **@prisma/client** - Database ORM (singleton in [lib/prisma.ts](lib/prisma.ts))
- **react-hook-form + zod** - Form validation
- **shadcn/ui** - All UI components in `components/ui/`

## Important Notes
- Middleware protects all routes except `/sign-in` and `/sign-up`
- Form IDs use auto-increment integers, but `shareUrl` uses UUIDs
- Published forms become read-only in the designer
- Form visits and submissions tracked via database increments

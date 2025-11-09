# Merica.cc Project Guidelines

## Project Overview

This is a **Nuxt 3 blog/documentation site** using MDC (Markdown Components) content, built with:
- **Framework**: Nuxt 3 with TypeScript
- **UI Library**: shadcn-docs-nuxt (extends base layer), Radix Vue, Tailwind CSS
- **Content**: MDC via shadcn-docs-nuxt for blog posts and documentation
- **State Management**: VueUse composables
- **Forms**: Vee-validate with Yup validation
- **Package Manager**: pnpm (v9.11.0)

## Common Commands

**Development:**
- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site (SSG)
- `pnpm preview` - Preview production build locally

**Installation:**
- `pnpm install` - Install dependencies (runs automatically via postCreateCommand)

**IMPORTANT**: Always use `pnpm` as the package manager, never npm or yarn.

## Project Structure

### Key Directories

```
app/
├── components/Ui/     - 49 Shadcn Vue components (Accordion, Alert, Button, etc.)
├── composables/       - Custom composables (useCarousel, useFormField, useToast)
├── utils/            - Utility functions (chart, sidebar, shared styles)
├── plugins/          - Nuxt plugins
└── assets/           - Global styles and assets

content/              - MDC markdown files for blog posts and docs
public/               - Static assets (favicon, logos)
```

### Configuration Files

- `nuxt.config.ts` - Nuxt configuration (modules, i18n, tailwind)
- `app.config.ts` - shadcn-docs-nuxt theme and site configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `ui-thing.config.ts` - UI component configuration
- `.prettierrc` - Code formatting rules

## Code Style and Conventions

### TypeScript & Vue 3

**ALWAYS follow these patterns:**
- Use **Composition API** with `<script setup>` syntax - NEVER use Options API
- Use **types over interfaces** for TypeScript definitions
- Use **arrow functions** for methods and computed properties
- Prefer **declarative programming** over imperative
- Use **descriptive variable names** with auxiliary verbs (isLoading, hasError)

### Component Structure

**File organization within components:**
1. Exported component definition
2. Composables
3. Helper functions
4. Static content
5. Types

**Example:**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComponentProps } from './types'

// Props and emits
const props = defineProps<ComponentProps>()
const emits = defineEmits<{ submit: [value: string] }>()

// Composables
const { isLoading } = useFormState()

// Computed
const isDisabled = computed(() => isLoading.value || !props.enabled)
</script>
```

### Naming Conventions

- **Directories**: lowercase-with-dashes (e.g., `components/auth-wizard`)
- **Components**: PascalCase (e.g., `AuthWizard.vue`)
- **Composables**: camelCase with `use` prefix (e.g., `useAuthState.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)

### Prettier Configuration

**IMPORTANT**: Code is auto-formatted on save with these rules:
- **Print width**: 100 characters
- **Indent**: 2 spaces (no tabs)
- **Quotes**: Double quotes
- **Semicolons**: Required
- **Trailing commas**: ES5
- **Arrow parens**: Always
- **Vue indent**: Script and style tags are indented

Import order (auto-sorted):
1. Built-in Node modules
2. Third-party modules
3. Type imports
4. Empty line
5. Relative imports

## UI Components

### Shadcn Vue Components

**Available components** (49 total in `app/components/Ui/`):
- Layout: Accordion, Card, Tabs, Separator, Sheet, Sidebar
- Forms: Button, Input, Select, Checkbox, Radio, Switch, Textarea, Form
- Feedback: Alert, AlertDialog, Dialog, Toast, Sonner
- Data: Table, TanStackTable, DataTable, Calendar, DatePicker
- Navigation: Breadcrumbs, Pagination, NavigationMenu
- Overlays: Popover, Tooltip, HoverCard, ContextMenu, DropdownMenu
- Media: Avatar, AspectRatio, Carousel
- And more...

**Usage pattern:**
```vue
<template>
  <UiButton variant="outline" size="lg" @click="handleClick">
    Click me
  </UiButton>
</template>
```

### Styling with Tailwind

- Use **mobile-first** responsive design
- Leverage **tailwind-variants** (imported as `tv`) for component variants
- Use `cn()` utility for conditional classes (if available)
- Follow existing component patterns for consistency

## Content Management

### MDC (Markdown Components)

**Content location**: `content/` directory

**Creating blog posts/docs:**
1. Create `.md` files in `content/` directory
2. Use frontmatter for metadata:
```markdown
---
title: Post Title
description: Post description
navigation: true
---

## Content here
```

3. Use MDC components in markdown:
```markdown
::hero
#title
Welcome to the site
::
```

**IMPORTANT**: The site extends `shadcn-docs-nuxt` layer - refer to [shadcn-docs-nuxt documentation](https://shadcn-docs-nuxt.vercel.app) for available MDC components.

## Git Workflow

### Branch Naming

**Pattern**: `[initials]/[issue-number?]-[2-3-word-description]`
- Max 24 characters total
- Extract initials from `git config user.name` (e.g., "brandon" → "b")
- Use dashes to separate words
- Lowercase only

**Examples:**
- `b/add-scraper-api`
- `b/123-fix-navigation`

**IMPORTANT**: Always run `git config user.name` first to get actual name - do not assume initials.

### Commit Messages

**Follow existing style** (check `git log --oneline -5`):
- Use sentence case
- Be descriptive but concise
- Current pattern: "Update project configuration and documentation"

**Example:**
```bash
git commit -m "Add web scraper API endpoints

Co-authored-by: Ona <no-reply@ona.com>"
```

## Development Environment

### Devcontainer Configuration

**Location**: `.devcontainer/devcontainer.json`

**Pre-installed extensions:**
- Vue.volar (Vue language support)
- Vue.vscode-typescript-vue-plugin
- Nuxt.mdc
- bradlc.vscode-tailwindcss
- esbenp.prettier-vscode
- And more...

**Port forwarding**: Port 3000 (dev server)

**Post-create command**: `pnpm install && pnpm dev`

### Environment Variables

**For secrets** (e.g., API keys):
1. Add to `.devcontainer/devcontainer.json` remoteEnv
2. Or use Nuxt runtime config in `nuxt.config.ts`:
```typescript
runtimeConfig: {
  apiKey: process.env.API_KEY || '',
}
```

**NEVER commit secrets** to version control.

## Planned Features

### Web Scraper (In Progress)

**Goal**: Build a Cloudflare Workers-based web scraper integrated with the blog.

**Architecture**:
- Cloudflare Workers for scraping logic
- D1 database for metadata/URLs
- R2 storage for scraped content
- Nuxt server routes for API (`server/api/scraper/`)
- UI dashboard using existing TanStack Table and Vee-validate

**Implementation steps**:
1. Create `server/api/scraper/` directory
2. Add Cloudflare Worker configuration
3. Build UI components for scraper management
4. Auto-generate MDC content from scraped data

## Testing & Quality

**Currently**: No test suite configured

**When adding tests**:
- Use Vitest for unit tests
- Use Playwright for e2e tests
- Follow Nuxt testing best practices

## Performance Optimization

**Built-in Nuxt optimizations:**
- Auto-imports for components and composables
- File-based routing
- Code splitting
- Image optimization (use WebP format)

**Best practices:**
- Use `useFetch` and `useAsyncData` for data fetching
- Implement lazy loading for routes and components
- Use `<Suspense>` for async components
- Optimize Web Vitals (LCP, CLS, FID)

## SEO

**Use Nuxt's built-in SEO features:**
- `useHead()` for meta tags
- `useSeoMeta()` for SEO metadata
- Configure in `app.config.ts` for site-wide settings

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
pkill -f "pnpm dev" || pkill -f "nuxt"
pnpm dev
```

**Module not found:**
```bash
rm -rf node_modules .nuxt
pnpm install
```

**Type errors:**
```bash
pnpm nuxt prepare
```

## Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [shadcn-docs-nuxt](https://shadcn-docs-nuxt.vercel.app)
- [Radix Vue](https://www.radix-vue.com)
- [VueUse](https://vueuse.org)
- [Tailwind CSS](https://tailwindcss.com)

## Notes for AI Agents

- **Always read files before editing** to understand context and conventions
- **Match existing code style** exactly (check .prettierrc)
- **Use pnpm** for all package operations
- **Check package.json** before assuming libraries are available
- **Follow Vue 3 Composition API** patterns consistently
- **Use relative paths** in commands (e.g., `app/components/` not `/workspaces/merica-cc/app/components/`)
- **Never commit** without explicit user permission

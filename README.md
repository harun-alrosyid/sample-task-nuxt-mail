# Nuxt Mail Application

A streamlined email management interface built with Nuxt 3.

### Tech Stack

- **Framework**: Nuxt 3 with TypeScript
- **State Management**: Pinia (Setup Store / Composition API)
- **Styling**: CSS (BEM Methodology)

### Key Features

- **Inbox & Archive**: Distinct views for managing email flow.
- **Bulk Actions**: Process multiple selections for archiving or marking as read.
- **Keyboard Shortcuts**:
  - `r`: Mark selection or open email as read.
  - `a`: Archive selection or open email.
  - `Esc`: Close individual detail view.

### Project Structure

- `components/`: UI components following strict BEM naming.
- `composables/`: Decoupled logic (e.g., keyboard listeners).
- `stores/`: App state managed via Pinia Setup Stores.
- `types/`: Shared TypeScript interfaces and definitions.
- `utils/`: Data initialization and static assets.

### Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

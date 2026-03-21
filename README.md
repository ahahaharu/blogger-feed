# BloggerFeed

A modern full-stack web application for reading and bookmarking blog posts. Built with the latest Next.js App Router features, it demonstrates server-side authentication, client-side state persistence, and a highly responsive UI.

[View WebSite](blogger-feed-git-login-ahahaharus-projects.vercel.app) 

* **Authentication:** Secure login flow using Auth.js (NextAuth v5) and DummyJSON API. Includes stateless sessions and edge-middleware route protection.
* **Posts Feed:** Fast and responsive feed of blog posts fetched from an external API using React Server Components.
* **Bookmarks System:** Client-side state management allowing users to save their favorite posts. Data is persisted across sessions using `localStorage`.
* **Modern UI:** Clean, accessible, and beautiful interface built with Shadcn UI components and the new Tailwind CSS v4.

## Tech Stack

* **Core:** Next.js 16 (App Router), React 19, TypeScript
* **Authentication:** Auth.js (NextAuth v5 beta)
* **State Management:** Zustand (with persist middleware)
* **Styling & UI:** 
  * Tailwind CSS v4
  * Shadcn UI (Radix UI primitives)
* **Validation:** Zod
* **Icons:** Lucide React
* **Linting & Compilation:** ESLint, React Compiler (Babel plugin)

## Getting Started

Follow these steps to set up the project locally.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ahahaharu/blogger-feed.git](https://github.com/ahahaharu/blogger-feed.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd blogger-feed
    ```

3.  **Install dependencies:**
    Using pnpm (recommended):
    ```bash
    pnpm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the root of the project and generate an authentication secret. You can generate one using `npx auth secret` or OpenSSL:
    ```env
    AUTH_SECRET="your-generated-secret-key-here"
    ```

5.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

## Building for Production

To create an optimized production build:

## Building for Production

To create an optimized production build:

```bash
pnpm build
```

Then, you can start the production server:

```bash
pnpm start
```

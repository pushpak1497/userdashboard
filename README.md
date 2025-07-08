# React Tailwind Dashboard

This project is a front-end React application that displays user profile and a comments dashboard. It is built with React, Tailwind CSS, and shadcn/ui components. The data is fetched from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake API (500 comments, 10 users):contentReference[oaicite:35]{index=35}.

## Features

- **Profile Screen:** Shows the first user’s profile (from `/users/1`). Read-only display of name, email, phone, etc. Includes a link back to the Comments Dashboard.
- **Comments Dashboard:** Shows all 500 comments in a paginated, searchable, and sortable table.
  - **Pagination:** Custom implementation (no third-party pagination library). Page size options: 10, 50, 100. Next/Previous buttons with page numbers.
  - **Search:** Partial search/filter on commenter’s name and email (case-insensitive substring match using `String.includes()`:contentReference[oaicite:36]{index=36}).
  - **Sorting:** Click column headers (Post ID, Name, Email) to sort ascending/descending/no-sort, cycling through on each click.
  - **State Persistence:** Search query, sort order, page number, and page size are saved in `localStorage` so that if you reload the page, your filters remain:contentReference[oaicite:37]{index=37}:contentReference[oaicite:38]{index=38}.
- **Styling and UI:** Uses **Tailwind CSS** for styling and responsiveness, including built-in animation classes (e.g. `animate-pulse` for loading states:contentReference[oaicite:39]{index=39}). UI components (Table, Buttons, Pagination) are provided by **shadcn/ui**, a Tailwind-based component library:contentReference[oaicite:40]{index=40}:contentReference[oaicite:41]{index=41}.

## Getting Started

### Prerequisites

- Node.js (>=16 recommended)
- npm (comes with Node.js)
- A browser (Chrome, Firefox, Edge)

### Installation

1. Clone the repository or extract the project files.
2. Install dependencies:
   ```bash
   npm install
   ```

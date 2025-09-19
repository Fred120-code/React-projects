# Task Manager React App

This is a modern Kanban-style Task Manager built with React and Vite. It allows you to organize, track, and manage tasks efficiently with features like drag-and-drop, filtering, priority management, and more.

## Features

- **Kanban Board:** Organize tasks by status (To Do, In Progress, Review, Done)
- **Add/Edit/Delete Tasks:** Create new tasks, update details, or remove them
- **Drag & Drop:** Move tasks between columns by dragging
- **Priority & Assignee:** Assign priorities (High, Medium, Low) and assignees
- **Due Dates & Overdue Detection:** Set due dates and see overdue tasks highlighted
- **Filtering:** Filter tasks by search, priority, or assignee
- **Responsive UI:** Clean, modern, and mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository or copy the p   roject folder:

   ```bash
   git clone <your-repo-url>
   cd React/task_manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the app for production:

```bash
npm run build
```

## Project Structure

- `src/`
  - `components/` - UI components (tasks, modals, layout, etc.)
  - `context/` - React context for global state management
  - `hooks/` - Custom React hooks
  - `utils/` - Helper functions (date, task, etc.)
  - `constants/` - App-wide constants (statuses, priorities, etc.)
  - `assets/` - Static assets (images, icons)
- `public/` - Static files

## Specificities

- **State Management:** Uses React Context API for global state (tasks, filters, etc.)
- **Validation:** Task forms are validated for required fields and due dates
- **Icons:** Uses [lucide-react](https://lucide.dev/) for modern SVG icons
- **Styling:** Tailwind CSS for utility-first, responsive design
- **Extensible:** Easily add new statuses, priorities, or features by editing constants and components

## Contributing

Feel free to fork this project and submit pull requests for improvements or new features!

## License

This project is open source and available under the MIT License.

# **TaskFlow - Modern Task Management App**

# **A sleek, professional task management application built with React, TypeScript, and Material-UI featuring drag-and-drop functionality, dark/light themes, and smooth animations.**


**Prerequisites**

Node.js (version 16 or higher)
npm or yarn package manager

**Installation**

Clone the repository
git clone <repository-url>
cd todo-app

Install dependencies
npm install 

**or**

yarn install

Install additional required packages

npm install @hello-pangea/dnd uuid

npm install uuid

**or**

yarn add @hello-pangea/dnd uuid

yarn add uuid

Start the development server

npm run dev

**or**

yarn dev

Build for production

npm run build

**or**

yarn build


**✨ Features Implemented**

✅ Core Features (as per task requirements)
✅ Task List View

View all tasks with title, optional description, and completion checkbox

Sort by creation date or completion status

✅ Add Task

Form to add new task with title (required) and description (optional)

✅ Edit & Delete

Edit existing tasks using a modal

Delete tasks with one click

✅ Responsive UI

Fully responsive for mobile, tablet, and desktop

Clean, consistent design with MUI components

**🌟 Bonus Features**

✅ Dark/Light Theme Toggle

Easily switch themes using MUI's theme system

✅ Task Persistence

Saves your tasks to localStorage (even after refresh)

✅ Drag-and-Drop Reordering

Reorder tasks using drag & drop with smooth animations

✅ Task Filtering

Filter tasks by: All / Completed / Pending

✅ Reusable Components

Built using React functional components with TypeScript for safety

**🛠 Technologies Used**

React 18+

TypeScript

Material UI (MUI v7)

@hello-pangea/dnd for drag-and-drop

UUID for generating unique task IDs

Vite for lightning-fast development

**🎨 Design Decisions & Trade-offs**

Area	                                Decision/Trade-off

Drag & Drop	               Only enabled when filter is set to "All" to avoid confusing UX

Persistence	               Used localStorage for simplicity instead of setting up a backend

Animations	               Used CSS transform for better performance (GPU-accelerated)

Theme Design	           Custom light/dark theme using MUI with gradients and glassmorphism-style effects

Component Structure	       Reusable TaskItem, TaskForm, and Header components for clarity


**📂 Folder Structure**

src/

├── components/          # TaskForm, TaskList, TaskItem, Header, etc.

├── theme/               # Light/dark theme config using MUI

├── types/               # TypeScript interfaces (e.g. Task type)

├── App.tsx              # Root component with state and layout

├── main.tsx             # Entry point



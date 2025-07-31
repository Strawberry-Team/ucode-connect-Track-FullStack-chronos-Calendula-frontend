<div align="center">
   <p align="center">
      <a href="https://ucode.world/en/" target="_blank">
         <img src="./public/ucode_it_academy_logo.svg" height="100px" alt="ucode_logo">
      </a>
   </p>

   <img src="./public/logo_favicon.png" width="200" />
   <h1 align="center">Calendula</h1>

<p align="center">
	<img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
	<img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React" />
	<img src="https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white" alt="Redux" />
	<img src="https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white" alt="React Router" />
	<img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white" alt="Axios" />
	<img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
	<img src="https://img.shields.io/badge/FullCalendar-1E90FF" alt="FullCalendar" />
	<img src="https://img.shields.io/badge/Shadcn-000000" alt="Shadcn" />
	<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
	<img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" alt="ESLint" />
	<img src="https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white" alt="Framer Motion" />
</p>

   <h3>
      <p align="center">
         <sub><i>
            ucode connect chronos "Calendula" is the project of ucode connect the Track FullStack programming bootcamp<br />
            lasting 4 weeks (March 3, 2025 - March 28, 2025),<br />where the Node.js with JavaScript and React with TypeScript and FullCalendar were used to develop the event planner web-application.<br /><br />
            The purpose: build a simple and powerful time planner<br />using the whole cycle of Challenge Based Learning framework with a team.
         </i></sub>
      </p>
   </h3>
</div>



# 📑 Table of Contents
- [🗓️ About "Calendula" App](#-about-calendula-app)
- [🧑‍💻 Team](#-team)
- [🌼 About "Calendula" Frontend](#-about-calendula-frontend)
- [🎯 Features and Functionality](#-features-and-functionality)
  - [🔐 Authentication & Authorization](#-authentication--authorization)
  - [👥 User Management](#-user-management)
  - [📅 Calendar Management](#-calendar-management)
  - [📋 Event Management](#-event-management)
  - [🎨 Visual Customization](#-visual-customization)
  - [📱 User Interface & Experience](#-user-interface--experience)
  - [🔔 Notifications & Reminders](#-notifications--reminders)
  - [📊 Event Analytics & Display](#-event-analytics--display)
  - [🛠 Technical Features](#-technical-features)
  - [🎯 Advanced Functionality](#-advanced-functionality)
- [👤 Use case diagram](#-use-case-diagram)
- [🧲 Activity diagram](#-activity-diagram)
- [🚚 Deployment Diagram](#-deployment-diagram)
- [🚀 Get started](#-get-started)



# 🗓️ About "Calendula" App
**Calendula** is an enterprise web app that transforms time management with flexible calendars, interactive events, and team sync.

Organise your day, share ideas, and streamline your workflow with easy search, notifications, and a personalised design.

Here is a [link](https://docs.google.com/presentation/d/1UFsV7MbyVHJA5UCWVKEkgtV1f3Buq-kT/edit?usp=sharing) to the presentation file.</p>

![Google Chrome 2025-06-20 21 23 42](https://github.com/user-attachments/assets/d72b1626-7664-4376-81e4-8b7686342eb9)
![CleanShot 2025-04-04 at 22 24 50@2x](https://github.com/user-attachments/assets/af5899fb-ac8d-4152-ad79-d6b3a58a2fbd)
![CleanShot 2025-04-04 at 22 22 42@2x](https://github.com/user-attachments/assets/f8c37dbe-48a0-4d73-ba2e-b2ca3f85d47c)



# 🧑‍💻 Team
<div>
    <ul>
        <li>
            <p>🧑🏼‍💻 <a href="https://github.com/laskevych">Andrew Laskevych</a></p>
        </li>
        <li>
            <p>👩🏼‍💻 <a href="https://github.com/InessaRepeshko">Inessa Repeshko</a></p>
        </li>
        <li>
            <p>🧑🏻‍💻 <a href="https://github.com/vzharyi">Vadym Zharyi</a></p>
        </li>
    </ul>
</div>

![CleanShot 2025-06-20 at 21 23 49](https://github.com/user-attachments/assets/f5f32cd2-bcec-4f07-8460-fc55e6649706)


# 🌼 About "Calendula" Frontend
Calendula is a calendar project inspired by Google Calendar. It is built using React, TypeScript, and Tailwind CSS, featuring a highly responsive and intuitive interface.

The Calendula project is designed for convenient task and event planning. It combines a minimalist design with robust functionality, allowing users to easily manage their time while also supporting customizable color themes. 

The application provides comprehensive calendar management with multiple calendar types, event creation and editing, participant management, and advanced collaboration features.

Built with modern web technologies, Calendula delivers a seamless experience for both individual users and teams, offering features like drag-and-drop event scheduling, real-time notifications, and flexible role-based access control.



# 🎯 Features and Functionality
**Calendula** is a comprehensive calendar management application that provides the following features:

### 🔐 Authentication & Authorization
- User registration with email confirmation
- Secure login system with JWT tokens
- Password reset functionality with email verification
- Email confirmation system for new accounts
- Protected routes with authentication guards
- Session management with automatic token refresh

### 👥 User Management
- User profile with avatar support
- Personal data viewing
- Birthday tracking for user profiles
- User search functionality by full name or email
- Searchable dropdown lists for user participation

### 📅 Calendar Management
- **Multiple Calendar Types:**
  - Personal "Main" calendars for each user
  - Shared calendars with collaboration features
  - "National Holidays" calendars by country
  - "Birthdays" calendars for company employees
  - System calendars for special events

- **Calendar Operations:**
  - Create, read, update, and delete calendars
  - Calendar color customization per user
  - Calendar visibility toggling (show/hide)
  - Calendar grouping into team and system categories
  - Unsubscribe functionality from shared calendars

- **Role-Based Access Control:**
  - **Owner:** Full CRUD operations, participant management
  - **Member:** View calendar, CRUD own events, invite participants
  - **Viewer:** Read-only access to calendar and events

- **Participant Management:**
  - Invite participants via email
  - Role assignment (Owner, Member, Viewer)
  - Color customization for each participant
  - Owner identification markers

### 📋 Event Management
- **Event Creation & Editing:**
  - Create events via calendar click or dedicated page
  - Quick event creation with pop-up interface
  - Detailed event creation page for complex events
  - Event editing with draft system
  - Duplicate event prevention

- **Event Properties:**
  - Title, description, and location
  - Start and end date/time configuration
  - All-day event support
  - Event categories: Work, Home, Hobby
  - Event types: Meeting, Reminder, Task
  - Custom color assignment per event
  - Notification settings (10 min, 30 min, 1 hour, 1 day)

- **Event Interaction:**
  - Drag and drop to reschedule events
  - Resize to change event duration
  - Click to view detailed information
  - Event deletion with confirmation
  - Type and category icons in event display

- **Participant Management:**
  - Invite participants via email
  - Attendance status tracking: Yes, No, Maybe
  - Visual attendance status indicators
  - Participant color customization
  - Event creator identification

### 🎨 Visual Customization
- **Color Management:**
  - Calendar-specific color themes
  - Event color customization
  - User-specific color preferences
  - Default color inheritance from calendars
  - Visual striping for custom colored events

- **Event Styling:**
  - Attendance-based visual styling
  - Special calendar type styling (holidays, birthdays)
  - Type-specific icons (meeting, reminder, task)
  - Category-specific icons (work, home, hobby)
  - Color-coded event borders and backgrounds

### 📱 User Interface & Experience
- **Calendar Views:**
  - Month view with full event display
  - Week view with time slots
  - Day view for detailed scheduling
  - Responsive design for mobile devices

- **Navigation:**
  - "Today" button for quick navigation
  - Previous/Next navigation controls
  - Mini calendar in sidebar for date jumping
  - Synchronized views between main and sidebar calendars
  - Current day and time highlighting

- **Search & Filtering:**
  - Event search by title and description
  - Real-time search with live results
  - Calendar-based filtering
  - Event type and category filtering
  - User-based participant filtering

### 🔔 Notifications & Reminders
- Event reminder system with customizable timing
- Toast notifications for user actions
- Success/error message system
- Real-time feedback for all operations
- Status change notifications

### 📊 Event Analytics & Display
- Event duration visualization
- Attendance status summaries
- Participant count displays
- Event timing with time zone support
- Recurring event pattern display

### 🛠 Technical Features
- **State Management:**
  - Redux for global state management
  - React hooks for local state
  - Context API for draft management
  - Persistent state across sessions

- **API Integration:**
  - RESTful API communication
  - Axios for HTTP requests
  - Error handling and validation
  - Token-based authentication

- **Performance Optimization:**
  - Memoized components and calculations
  - Efficient event filtering and rendering
  - Lazy loading of calendar data
  - Optimized re-renders

### 🎯 Advanced Functionality
- **Event Draft System:**
  - Save and restore event drafts
  - Cross-page draft persistence
  - Edit mode with pre-filled data
  - Draft cleanup on completion

- **Interactive Features:**
  - Popover-based event details
  - Modal-based calendar management
  - Confirmation dialogs for destructive actions
  - Tooltip information displays

- **Time Management:**
  - Automatic scroll to current time
  - Time slot selection and highlighting
  - Duration-based event creation
  - Time zone awareness



# 👤 Use case diagram
 ![Use_Case_Diagram](https://github.com/user-attachments/assets/f3d36261-01ff-45aa-b711-fc5385f250f8)



# 🧲 Activity diagram
![Діаграма діяльності (Activity Diagram)](https://github.com/user-attachments/assets/673b98e8-3747-4c24-a131-f0a65d2c5cdc)



# 🚚 Deployment Diagram
![Deployment_Diagram](https://github.com/user-attachments/assets/60806da5-3964-435e-bfe4-9499c8ed97f4)



# 🚀 Get started
1. Run the [calendula-backend](https://github.com/Strawberry-Team/calendula-backend) project.
2. Clone this repository and move to the project directory:
   ```bash
   git clone <repository-url> calendula-frontend
   cd calendula-frontend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Run commands:
   ```sh
   npm run build:dev
   ```
   ```sh
   npm run start:dev
   ```
5. Application will be launched on [http://localhost:3000/](http://localhost:3000/).

---

© Inessa Repeshko. 2025

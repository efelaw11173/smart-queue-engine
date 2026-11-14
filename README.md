Smart Queue Engine

A lightweight, browser-based patient queue management system built with HTML, CSS, and JavaScript.

Smart Queue Engine provides a simple interface for registering patients, managing waiting queues, and tracking patient statuses.

Overview

Managing a patient queue involves more than just registering names. Patients need to be tracked, duplicate records should be avoided, and their progress through the queue should be easy to manage.

Smart Queue Engine explores how these operations can be handled through a simple frontend application.

Features

- Patient registration: Add patients using their full name and unique patient ID.
- Input validation: Prevent registration when required fields are empty.
- Duplicate detection: Check existing patient IDs before adding a new record.
- Queue management: Display registered patients and their queue positions.
- Patient status tracking: Mark patients as served or skipped.
- Patient removal: Remove patients from the queue.
- Queue statistics: Track waiting, served, and skipped patients.
- Data persistence: Preserve queue data and statistics using browser LocalStorage.
- Responsive interface: Layout adapts to different screen sizes.

Technologies Used

- HTML5 — application structure.
- CSS3 — styling and responsive layout.
- JavaScript — application logic and queue management.
- Browser LocalStorage — client-side data persistence.

Getting Started

No installation or external dependencies are required.

Run locally

1. Clone the repository:
   
   git clone https://github.com/efelaw11173/smart-queue-engine.git

2. Open the project folder.

3. Open "index.html" in your browser.

Alternatively, you can download the repository and open the HTML file directly.

How It Works

1. Register a patient using their name and ID.
2. The application validates the submitted information.
3. A valid patient is added to the queue with a generated position.
4. Patients appear in the queue with their current status.
5. Use the available actions to mark patients as served, skip them, or remove them.
6. Queue information and statistics are saved in LocalStorage.

Project Structure

smart-queue-engine/
│
├── index.html
├── index.css
├── index.js
├── README.md
│
└── screenshots/
    ├── registration.png
    └── patient-queue.png

Screenshots

Screenshots of the application will be added here.

<!-- Add application screenshots here -->Current Limitations

- Data is stored locally in the browser.
- There is no backend or shared database.
- Data is not synchronised between different devices or browsers.
- The application does not currently provide multi-user access.

Future Improvements

- Backend integration and database storage.
- Improved patient history and queue reporting.
- More advanced queue management.
- Authentication and user access management.

Author

Onanefe

GitHub: "@efelaw11173" (https://github.com/efelaw11173)

---

Built as a hands-on project to explore JavaScript logic, state management, DOM manipulation, and practical application development.

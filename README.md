# CodeCraft Frontend

<img src="CodeCraft.png" alt="CodeCraft" style="zoom:25%;" />

## Project Background/Overview
CodeCraft is your go-to platform for mastering coding through engaging Parson's Problems. The platform provides a simple and efficient way to practice and enhance your data-processing coding skills by reordering code snippets related to data-analysing challenges. Perfectly designed for Unimelb COMP20008 students and coordinators, CodeCraft helps you build a strong foundation in coding while tracking your progress across different aspects.

CodeCraft's frontend is built with Vue.js 3, providing an interactive web interface for learning and practicing coding concepts through hands-on problem-solving. The frontend delivers a rich user interface with features like drag-and-drop code snippets, real-time feedback, and an intuitive learning experience.

## Demo
Visit our live platform: [CodeCraft Website](http://54.252.5.239/)

## Features (User Stories by Sprint)

### Sprint 1: Initial Data Flow & Question Interface
- Implemented data transaction between frontend and backend using Axios
- Developed first draft of question page featuring:
  - Predefined topics for practice
  - Context-based learning structure
  - Basic question display interface

### Sprint 2: Core Functionality Development
- Created comprehensive website structure including:
  - Introduction/landing page
  - Topic and context selection interface
  - Admin dashboard with secure login
- Enhanced question page functionality:
  - Integrated IDE section for code viewing
  - Added real-time answer status updates
  - Improved user interaction flow

### Sprint 3: UI/UX Enhancement & Logic Refinement
- Refined question answering logic and feedback system
- Implemented enhanced UI/UX elements throughout the platform
- Added current question feedback functionality
- Improved overall user experience with:
  - Smoother transitions
  - More intuitive interface
  - Enhanced visual feedback

## Documentation

### Project Documentation
- [Detailed Documentation PDF](docs/Confluence%20Space%20-Team%20003%20Deadline%20Dominators.pdf)

The documentation includes:
- User Stories and Requirements
- System Architecture Details
- Test Cases and Results
- Project Timeline and Sprints
- Team Meeting Minutes
- Technical Specifications

## System Requirements
### Tools and Versions
- Node.js (Latest stable version)
- npm (Package manager, comes with Node.js)
- Git (Optional, for version control)
- Vue.js 3
- Babel (For testing)

## Installation Guide

### Setup and Configuration
1. Clone the frontend repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `localhost:8081`

## Application Layer

The frontend codebase follows a standard Vue.js project structure, organized into the following directories:

### `src/assets/`
- Contains static resources used throughout the application
- Includes images, icons, and global CSS styles
- Houses the CodeCraft logo and UI design assets
- Contains custom fonts and theme-related files

### `src/components/`
Core Vue components organized by feature:
- `Nav.vue`: Navigation bar component with admin authentication
- `Dashboard.vue`: Admin dashboard with user statistics and data visualization
- `APP.vue`: Main question interface with drag-and-drop functionality
- `CodeEditor.vue`: IDE-style code editor with syntax highlighting
- `Topic.vue`: Topic selection interface
- `Context.vue`: Context-based learning interface
- Other utility and shared components

### `src/router/`
- Vue Router configuration and route definitions
- Handles navigation between different views
- Implements route guards for admin authentication
- Manages URL parameters for topics and questions

### `src/store/`
Vuex store modules for state management:
- User authentication state
- Global application settings

### `src/tests/`
Comprehensive test suite organized by component:
- Unit tests for all major components
- Integration tests for critical user flows
- Test utilities and mock data
- Configuration files for Jest and Vue Test Utils

### Directory Structure
```
src/
├── assets/
│   ├── images/
│   └── styles/
├── components/
│   ├── dashboard/
│   ├── homePage/
│   └── question/
├── router/
│   └── index.js
├── store/
│   └── index.js
└── tests/
    ├── unit/
```

Each directory follows Vue.js best practices and contains appropriate documentation and type definitions where necessary. The structure is designed to be scalable and maintainable, with clear separation of concerns between different parts of the application.

Note: While this follows a standard Vue.js project structure, our implementation focuses specifically on educational features and administrative capabilities required for the CodeCraft platform.

### Deployment Steps
1. Generate static files for production:
   ```bash
   npm run build
   ```
2. Upload the generated static files to your hosting platform
3. Note: Update any `localhost` references in the code to your hosting platform's public IP address

### Testing
Frontend tests are located in `frontend/src/tests/unit`
To run tests:
```bash
npm test
```

## Changelog

### Version 1.2.0 (October 24-28, 2024)
#### Production & Deployment
- Server-side testing and deployment optimization (Oct 28)
- Successfully deployed service and hosted on server (Oct 24)
- Changed server IP configuration (Oct 24)
- Fixed logical errors in submit functionality (Oct 24)

#### Features & Improvements
- Refined retry and code editor logic with expand/collapse feature (Oct 28)
- Enhanced dashboard with drag-drop functionality and improved test cases (Oct 27)
- Updated admin testing and bug fixes in feedback system (Oct 27)
- Repaired nav.vue component Vuex actions (Oct 27)

### Version 1.1.0 (October 10-23, 2024)
#### UI/UX Enhancements
- UI update on dashboard with user feedback integration (Oct 23)
- Added extra interaction and new icons in question page (Oct 22)
- Implemented new instruction format and indentation hints for new users (Oct 20)
- Added detail transitions and logic changes for imports (Oct 10)

#### Core Features
- Updated dragdrop and feedback component unit testing (Oct 22)
- Implemented filter and sortby functionality in dashboard (Oct 13)
- Refined question interface with responsive feedback buttons (Oct 12)
- Enhanced data passing between frontend and backend (Oct 11)

### Version 1.0.0 (October 1-9, 2024)
#### Major Features
- Added response feedback to all component buttons (Oct 8)
- Implemented pagination for element table (Oct 7)
- Enhanced dashboard with expandable table feature (Oct 7)
- Complete interface update for nav and dashboard (Oct 3)
- Added predefined difficulty levels and completeness tracking (Oct 2)
- Integrated rating system (Oct 2)

### Version 0.2.0 (September 20-30, 2024)
#### Core Development
- Implemented functional IDE response system (Sept 23)
- Enhanced data transportation for IDE feedback (Sept 23)
- Improved dashboard time section display (Sept 24)
- Completed basic functionality prototype (Sept 24)

#### Testing & Quality
- Comprehensive unit testing implementation (Sept 22-25)
  - Topic component testing
  - App component testing
  - Nav component testing
- Updated test settings for Jest and Vue3 (Sept 22)

### Version 0.1.0 (August 1 - September 15, 2024)
#### Initial Development
- Created draft version of admin dashboard and login (Sept 13)
- Implemented navigation flow: homepage->topic->context->question (Sept 11)
- Developed prototype of start page and topic selection (Sept 6)
- Created improved prototype answering page with AI model connection (Aug 26)
- Initial Vue framework setup (Aug 24)
- Developed draft version of Q&A interface (Aug 23)
- Project initialization and setup (Aug 1)

## Traceability matrix

| Requirment ID | Description                                                  | Test Case lD   | Status |
| ------------- | ------------------------------------------------------------ | -------------- | ------ |
| 1             | Users can choose a topic according to their needs.           | TC_001         | Passed |
| 2             | Users can choose a specific context  according to their needs. | TC_002         | Passed |
| 3             | Users have the choice to regenerate code.                    | TC_008         | Passed |
| 4             | Users can know whether they answer is correct.               | TC_006         | Passed |
| 5             | Users can get feedback of IDE as soon as they submit code.   | TC_006         | Passed |
| 6             | Users are able to use the platform anonymously.              | User_011       | Passed |
| 7             | Users see a feedback that showing  performance.              | TC_007         | Passed |
| 8             | Users can see the description of question and corresponding code. | DRAGDROP-002   | Passed |
| 9             | Users can expand or hide the description of question at any time. | AP_003         | Passed |
| 10            | Users are able to see the hint to a particular question.     | ProbS-002      | Passed |
| 11            | Users get questions generated by the LLM model to be consistent in quality, relevance, and difficulty level. | AI - 004       | Passed |
| 12            | Users get code generated by the LLM model to be correct and functional based on the questions generated previously. | AI - 005       | Passed |
| 13            | Users get each code block indented by clicking on the block. | AP_008         | Passed |
| 14            | Administrators can not see every users' IP addresses.        | User-001       | Passed |
| 15            | Administrators logIn in based on the predefined admin key.   | NAV-004/TC_003 | Passed |
| 16            | Administrators have a summary of the anonymous forms of student response performance | DASHBOARD-002  | Passed |
| 17            | Administrators have all the functions that student account have. | AP_002         | Passed |




## Contributors
- Howard Li (howard3@student.unimelb.edu.au)
- Yiru Liu (yirul6@student.unimelb.edu.au)
- Yan Gong (yagong1@student.unimelb.edu.au)
- Jiayi Wang (jiawang10@student.unimelb.wedu.au)
- Yifan Zhang (yifanzhang@student.unimelb.edu.au)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

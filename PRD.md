# Product Requirements Document (PRD)

## LaunchCamp Backend

### 1. Product Overview

**Product Name:** LaunchCamp Backend
**Version:** 1.0.0
**Product Type:** Backend API for a Project Management Platform

LaunchCamp Backend is a RESTful API built to power a collaborative project management application. It provides the backend infrastructure required for teams to create and organize projects, manage tasks and subtasks, maintain project notes, and securely authenticate users through a role-based permission system.

---

### 2. Target Users

* **Administrators:** Responsible for creating projects, managing project members and roles, and overseeing all project operations.
* **Project Admins:** Handle project-level management, including task organization and project-related content.
* **Team Members:** Access assigned projects, track task progress, complete subtasks, and view relevant project information.

---

### 3. Core Features

#### 3.1 Authentication & Authorization

* **User Registration:** Allow users to create accounts with email verification.
* **Secure Login:** Authenticate users using JWT-based access tokens.
* **Password Management:** Enable password updates along with forgot/reset password functionality.
* **Email Verification:** Confirm user accounts through verification tokens sent via email.
* **Token Refresh:** Generate new access tokens using refresh tokens.
* **Role-Based Authorization:** Implement three permission levels: Admin, Project Admin, and Member.

#### 3.2 Project Management

* **Create Projects:** Allow administrators to create projects with a title and description.
* **Project Overview:** Display all projects accessible to a user along with team member counts.
* **Project Information:** Retrieve detailed information for individual projects.
* **Edit Projects:** Allow only administrators to modify project details.
* **Delete Projects:** Permit administrators to permanently remove projects.

#### 3.3 Team Management

* **Invite Members:** Add users to projects using their email addresses.
* **View Members:** Display the complete list of users assigned to a project.
* **Manage Roles:** Allow administrators to update project member roles.
* **Remove Members:** Enable administrators to remove users from a project.

#### 3.4 Task Management

* **Task Creation:** Create project tasks with a title, description, and assigned user.
* **Task Listing:** Retrieve all tasks associated with a project.
* **Task Details:** View complete information about a specific task.
* **Task Modification:** Update task details as well as task status.
* **Task Removal:** Delete tasks when necessary.
* **File Attachments:** Support attaching multiple files to a task.
* **Task Assignment:** Assign responsibility for tasks to project members.
* **Status Workflow:** Maintain task states using Todo, In Progress, and Done.

#### 3.5 Subtask Management

* **Create Subtasks:** Add subtasks under existing tasks.
* **Update Subtasks:** Edit subtask details and completion status.
* **Delete Subtasks:** Allow Admins and Project Admins to remove subtasks.
* **Completion Tracking:** Enable members to mark assigned subtasks as completed.

#### 3.6 Project Notes

* **Create Notes:** Allow administrators to add notes to projects.
* **View Notes:** Retrieve all notes related to a project.
* **Note Details:** Access the full content of individual notes.
* **Edit Notes:** Permit administrators to update existing notes.
* **Delete Notes:** Allow administrators to remove notes when required.

#### 3.7 System Monitoring

* **Health Check Endpoint:** Provide an API endpoint to verify application availability and operational status.

---

### 4. Technical Specifications

#### 4.1 API Endpoint Structure

**Authentication Routes** (`/api/v1/auth/`)

* `POST /register` - User registration
* `POST /login` - User authentication
* `POST /logout` - User logout (secured)
* `GET /current-user` - Retrieve authenticated user information (secured)
* `POST /change-password` - Update user password (secured)
* `POST /refresh-token` - Generate a new access token
* `GET /verify-email/:verificationToken` - Verify user email
* `POST /forgot-password` - Request password reset
* `POST /reset-password/:resetToken` - Reset forgotten password
* `POST /resend-email-verification` - Resend verification email (secured)

**Project Routes** (`/api/v1/projects/`)

* `GET /` - List accessible projects (secured)
* `POST /` - Create a project (secured)
* `GET /:projectId` - Retrieve project details (secured, role-based)
* `PUT /:projectId` - Update project information (secured, Admin only)
* `DELETE /:projectId` - Delete a project (secured, Admin only)
* `GET /:projectId/members` - Retrieve project members (secured)
* `POST /:projectId/members` - Add a project member (secured, Admin only)
* `PUT /:projectId/members/:userId` - Change member role (secured, Admin only)
* `DELETE /:projectId/members/:userId` - Remove a project member (secured, Admin only)

**Task Routes** (`/api/v1/tasks/`)

* `GET /:projectId` - Retrieve project tasks (secured, role-based)
* `POST /:projectId` - Create a task (secured, Admin/Project Admin)
* `GET /:projectId/t/:taskId` - Retrieve task details (secured, role-based)
* `PUT /:projectId/t/:taskId` - Modify a task (secured, Admin/Project Admin)
* `DELETE /:projectId/t/:taskId` - Remove a task (secured, Admin/Project Admin)
* `POST /:projectId/t/:taskId/subtasks` - Create a subtask (secured, Admin/Project Admin)
* `PUT /:projectId/st/:subTaskId` - Update a subtask (secured, role-based)
* `DELETE /:projectId/st/:subTaskId` - Delete a subtask (secured, Admin/Project Admin)

**Note Routes** (`/api/v1/notes/`)

* `GET /:projectId` - Retrieve project notes (secured, role-based)
* `POST /:projectId` - Add a project note (secured, Admin only)
* `GET /:projectId/n/:noteId` - Retrieve note details (secured, role-based)
* `PUT /:projectId/n/:noteId` - Edit a project note (secured, Admin only)
* `DELETE /:projectId/n/:noteId` - Delete a project note (secured, Admin only)

**Health Check** (`/api/v1/healthcheck/`)

* `GET /` - Check API health status

---

#### 4.2 Permission Matrix

| Feature                    | Admin | Project Admin | Member |
| -------------------------- | :---: | :-----------: | :----: |
| Create Project             |   ✓   |       ✗       |    ✗   |
| Update/Delete Project      |   ✓   |       ✗       |    ✗   |
| Manage Project Members     |   ✓   |       ✗       |    ✗   |
| Create/Update/Delete Tasks |   ✓   |       ✓       |    ✗   |
| View Tasks                 |   ✓   |       ✓       |    ✓   |
| Update Subtask Status      |   ✓   |       ✓       |    ✓   |
| Create/Delete Subtasks     |   ✓   |       ✓       |    ✗   |
| Create/Update/Delete Notes |   ✓   |       ✗       |    ✗   |
| View Notes                 |   ✓   |       ✓       |    ✓   |

---

#### 4.3 Data Models

**User Roles**

* `admin` — Complete system-level privileges
* `project_admin` — Administrative permissions within assigned projects
* `member` — Standard project participant access

**Task Status**

* `todo` — Task has not yet started
* `in_progress` — Task is currently in progress
* `done` — Task has been completed

---

### 5. Security Features

* JWT authentication with refresh token support
* Middleware-based role authorization
* Request validation across all API endpoints
* Email verification during account registration
* Secure password recovery and reset process
* Protected file uploads using Multer
* Configurable CORS support for cross-origin communication

---

### 6. File Management

* Multiple file uploads supported for tasks
* Uploaded files stored within the `public/images` directory
* Maintain metadata including file URL, MIME type, and size
* Secure handling and validation of uploaded files

---

### 7. Success Criteria

* Reliable authentication and authorization mechanisms
* End-to-end project management capabilities
* Structured task and subtask workflow
* Consistent enforcement of role-based permissions
* Support for task file attachments
* Email-based verification and password recovery workflow
* Well-organized REST API with clearly defined endpoints

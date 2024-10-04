# training_project

This is a full-stack application built with Flask for the backend and React for the frontend. This guide will help you set up and run both parts of the application locally.

## Table of Contents

- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)

## Backend Setup

### Prerequisites

Make sure you have the following installed on your system:

- Python 3.x
- pip (Python package installer)
- MySQL (or your preferred database)

### Installation

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Create a virtual environment:

   ```
   python -m venv dev_env
   ```

3. Activate the virtual environment:

```
On Windows: dev_env\Scripts\activate

On macOS/Linux: source dev_env/bin/activate
```

4. Install the required packages:

   ```
   pip install -r requirements.txt
   ```

5. Set up the database:

```bash
flask db init
flask db upgrade
```

6. Run the Flask application:

```bash
python run.py
```

7. Frontend Setup
   Prerequisites
   Make sure you have the following installed on your system:

```
Node.js (which includes npm)
```

8. Navigate to the frontend directory:

```
cd frontend
cd ../frontend [if you are in backend folder]
npm install
```

9. Start the React application:

```
npm run dev
```

10. Running the Application

```
Frontend: http://localhost:3000
Backend: http://localhost:5000
```

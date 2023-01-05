# Design Document for Notice Board

## Idea:
Works a bit like a Kanban Board.

## Parts:

### Frontend:
UI that allows users to drag notices into different sections.
Four sections: Backlog, Selected, In Progress, Done
Each notice just stores a description of the job and due date.

### Backend:
node.js server to handle http requests.
Want to set it up so that post requests sent to the backend will create new notices and the get requests will display notices.
Currently, notices are stored persistently in JSON file. Need to switch that over to a database.

### How to run:
clone repo locally.
Then cd backend, and run `npm start` to start the backend server.
cd frontend, and run `npm run serve` to start hosting the service as a whole.

### Future Plans
Add OAuth, make it a social media app. Can look up other people's noticeboards and star them. (Notice-me is our version of likes). 


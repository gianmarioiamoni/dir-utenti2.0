# Dir-Utenti 2.0

🎯 A full-stack application for managing a user directory with real-time updates, optimized for responsiveness and user experience. 

![Screenshot 2024-12-14 alle 00 09 29](https://github.com/user-attachments/assets/59ceef22-80b4-42e5-b15f-382d87de4e4e)


## 🚀 Key Features

- **User Management:**
  - View users with server-side pagination
  - Add new users with profile image upload
  - Edit user details with real-time updates
  - Delete users with instant notifications
  - Search users by name, surname, or email
    
  ![Screenshot 2024-12-14 alle 00 09 46](https://github.com/user-attachments/assets/75abc4df-ed66-42c0-a462-d4434810a646)
  
  ![Screenshot 2024-12-14 alle 00 10 53](https://github.com/user-attachments/assets/6836e1de-e737-493b-8ba3-6e850ffbc5aa)

  ![Screenshot 2024-12-14 alle 00 13 29](https://github.com/user-attachments/assets/7b155b74-6e07-4f2b-bcf3-ac627db90367)

  ![Screenshot 2024-12-14 alle 00 48 45](https://github.com/user-attachments/assets/96e13bfd-4be3-4204-91a0-c0ebff04a139)


- **Real-time Updates:**
  - Socket.IO integration for instant notifications
  - Live updates when users are added/deleted
  - Concurrent editing protection with Redis locks

  ![Screenshot 2024-12-14 alle 00 53 54](https://github.com/user-attachments/assets/a560d653-a239-4e47-9b56-10ed12fcda3b)

  ![Screenshot 2024-12-14 alle 00 54 54](https://github.com/user-attachments/assets/353d5bfa-8411-4a05-af74-3f8bed9d51bf)

  ![Screenshot 2024-12-14 alle 00 52 38](https://github.com/user-attachments/assets/9741404e-9cc1-493e-9150-79dfc577dd2b)

    
- **Advanced User Experience:**
  - Responsive design with Tailwind CSS
  - Form validation (client & server side)
  - Toast notifications for actions
  - Breadcrumb navigation
  - Profile image management with Cloudinary

## 🛠️ Technologies

### Frontend
- **Framework**: ${\color{lightgreen}Next.js \space 14}$ with ${\color{lightgreen}TypeScript}$
- **State Management:** ${\color{lightblue}SWR}$
- **Styling:** ${\color{lightgray}Tailwind \space CSS}$, ${\color{lightgray}NextUI}$
- **Real-time:** ${\color{pink}Socket.IO \space client}$
- **Notifications:** ${\color{lightblue}React \space Toastify}$
- **Date Handling:** ${\color{lightblue}Day.js}$

### Backend
- **Runtime:** ${\color{orange}Node.js}$, ${\color{orange}Express.js}$
- **Language:** ${\color{lightgreen}TypeScript}$
- **Database:** ${\color{red}MongoDB}$ with ${\color{red}Mongoose}$
- **Caching:** ${\color{lightblue}Redis}$ for locks
- **Real-time:** ${\color{pink}Socket.IO \space server}$
- **Validation:** ${\color{lightblue}Express-validator}$
- **API Documentation:** ${\color{lightblue}Swagger}$
- **File Upload:** ${\color{lightblue}Cloudinary}$

## 📡 API Documentation

### User Endpoints

```bash
GET /api/users
- Query params: page, limit, fields, search
- Returns paginated user list

GET /api/users/:id
- Returns specific user details

POST /api/users
- Creates new user
- Requires: name, surname, email, birthdate
- Optional: profile picture

PUT /api/users/:id
- Updates user
- Requires user lock

DELETE /api/users/:id
- Deletes user
- Requires user lock

GET /api/users/lock/:id
- Acquires user lock

DELETE /api/users/lock/:id
- Releases user lock
```

### Upload Endpoint

```bash
POST /api/upload
- Uploads file to Cloudinary
- Returns file URL
```

## 🔧 Environment Variables

### Client (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Server (.env)
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database
REDIS_URL=redis://localhost:6379
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```
3. Set up environment variables
4. Start development servers:
   ```bash
   # Start client (from client directory)
   npm run dev

   # Start server (from server directory)
   npm run dev
   ```

## 🔒 Concurrent Editing Protection

The application implements a locking mechanism using Redis to prevent concurrent editing of the same user:

1. When a user starts editing, a lock is acquired
2. Lock expires automatically after 30 seconds
3. Only the client with the lock can save changes
4. Lock is released after saving or canceling

## 🔄 Real-time Updates

Socket.IO is used for real-time features:

1. Instant notifications when users are added/deleted
2. Notifications only sent to other connected clients
3. Client identification via session storage
4. Automatic reconnection handling

## 🔜 Future Improvements

1. Implement user authentication
2. Add bulk user operations
3. Enhance search with filters
4. Add user activity logging
5. Implement file type validation for uploads

## 🎨 User Interface

### User List
- Display users saved in the database
- Server-side pagination for optimal performance
- Intuitive navigation buttons
- **Data Fetching with SWR:**
  - Automatic data updates
  - Integrated cache for improved speed and reduced requests

### User Details
- Dedicated page for each user
- Complete information display
- Easy navigation with breadcrumbs
- Profile image preview

### User Form
- Intuitive form for adding/editing users
- Client-side validation for immediate feedback
- Server-side validation for data integrity
- Profile image upload with preview

## 🛡️ Error Handling

The application implements a robust error handling system:
- **Server:** Dedicated middleware for centralized error management
- **Client:** Custom hooks for error interception and toast notifications

## 📚 API Documentation

Complete API documentation is available via Swagger:
- Development: http://localhost:5000/api-docs
- Production: https://your-api-domain/api-docs

## 🙌 Contributing

Contributions and bug reports are welcome! Please feel free to submit issues and pull requests.

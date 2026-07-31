# Spotify Backend

This project is the backend for a Spotify-style music application. It provides authentication, music upload, album management, and protected API endpoints built with Node.js, Express, and MongoDB.

## What it does

- User registration, login, and logout
- Role-based access for `user` and `artist`
- Music upload and update using file storage with ImageKit
- Album creation and album retrieval
- MongoDB persistence for users, tracks, and albums

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication stored in cookies
- Multer for file uploads
- ImageKit for music file storage

## Project Structure

```text
Backend/
	server.js
	src/
		app.js
		controllers/
		db/
		middlewares/
		models/
		routers/
		services/
```

## Setup

### 1. Install dependencies

From the Backend folder, install the packages:

```bash
npm install
```

### 2. Create environment variables

Create a `.env` file in the Backend folder with these values:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### 3. Start the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server starts after connecting to MongoDB.

## Authentication

Authentication uses a JWT saved in a cookie named `token`.

- `authUser` allows both `user` and `artist` roles
- `authArtist` allows only `artist` roles

## Data Models

### User

- `username` - required, unique
- `email` - required, unique
- `password` - required, stored as a bcrypt hash
- `role` - either `user` or `artist`, defaults to `user`

### Music

- `uri` - uploaded file URL
- `title` - track title
- `artist` - reference to the user who uploaded the track

### Album

- `title` - album title
- `artist` - reference to the album owner
- `musics` - list of music item references

## API Endpoints

Base routes:

- `/api/auth`
- `/api/music`

### Auth Routes

#### POST `/api/auth/register`

Registers a new user.

Body:

```json
{
	"username": "artist1",
	"email": "artist1@example.com",
	"password": "password123",
	"role": "artist"
}
```

#### POST `/api/auth/login`

Logs in a user and sets the auth cookie.

Body:

```json
{
	"username": "artist1",
	"password": "password123"
}
```

You can also log in using `email` instead of `username`.

#### POST `/api/auth/logout`

Clears the auth cookie.

### Music Routes

#### POST `/api/music/create`

Creates a new music record. Requires artist access.

Request type: `multipart/form-data`

Fields:

- `title` - music title
- `music` - audio file upload

#### GET `/api/music/all`

Returns music items for authenticated users.

#### GET `/api/music/:id`

Returns a single music item by ID.

#### PATCH `/api/music/update/:id`

Updates a music item. Requires artist access.

Request type: `multipart/form-data`

Fields:

- `title` - optional new title
- `music` - optional replacement audio file

#### POST `/api/music/album/create`

Creates a new album. Requires artist access.

Body:

```json
{
	"title": "My Album",
	"musics": ["musicId1", "musicId2"]
}
```

#### GET `/api/music/album/all`

Returns all albums for authenticated users.

#### GET `/api/music/album/:id`

Returns a single album by ID.

## Behavior Notes

- Passwords are hashed with bcrypt before storage.
- Music files are uploaded to ImageKit and the returned file URL is saved in MongoDB.
- Protected routes read the JWT from cookies, so the client must keep cookies enabled.
- Album and music responses include populated user references where applicable.

## Example Flow

1. Register an artist account.
2. Log in to receive the auth cookie.
3. Upload a music file using the create music endpoint.
4. Create an album using the uploaded music IDs.
5. Fetch albums and music through the protected read endpoints.

## Scripts

- `npm run dev` - start with Nodemon
- `npm start` - start with Node.js

## Notes

This backend expects a running MongoDB instance and valid ImageKit credentials before the upload routes can work.

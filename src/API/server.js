import { PrismaClient } from '@prisma/client';
import express from "express";
import cors from "cors";

// Initialize express app and Prisma client
const app = express();
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json()); // <-- Add this line to parse JSON bodies

// Enable CORS
app.use(cors());

const port = 5001;

// Existing routes...
app.get('/songs', async (req, res) => {
  const songs = await prisma.track.findMany({
    select: {
      title: true,
      coverImage: true,
      id: true,
      userId:true,
      uploadedAt: true
    },
  })
  res.json(songs)
});

app.get('/playlists', async (req, res) => {
  const playlists = await prisma.playlist.findMany({
    select: {
      name: true,
      coverImage: true
    },
  })
  res.json(playlists)
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      profilePicture: true,
      id: true
    },
  })
  res.json(users)
});

app.get('/likes', async (req, res) => {
  const likes = await prisma.like.findMany({
    select: {
      userId: true,
      trackId: true
    },
  })
  res.json(likes)
});

app.get('/followers', async (req, res) =>{
  const follows = await prisma.follow.findMany({
    select:{
      followerId: true,
      followingId: true
    },
  })
  res.json(follows);
});

// New POST and DELETE routes for following and unfollowing
app.post('/followers', async (req, res) => {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    return res.status(400).json({ error: 'Missing followerId or followingId' });
  }

  try {
    // Create a follow relationship in the database
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
    res.status(201).json(follow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error following the user' });
  }
});

app.delete('/followers', async (req, res) => {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    return res.status(400).json({ error: 'Missing followerId or followingId' });
  }

  try {
    // Delete the follow relationship in the database
    const follow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    res.status(200).json(follow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error unfollowing the user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

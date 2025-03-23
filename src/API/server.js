import { PrismaClient } from '@prisma/client'
import express from "express";
import cors from "cors";


const app = express()
app.use(cors());
const port = 5001
const prisma = new PrismaClient()

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
})

app.get('/playlists', async (req, res) => {
  const playlists = await prisma.playlist.findMany({
    select: {
      name: true,
      coverImage: true
    },
  })
  res.json(playlists)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      profilePicture: true,
      id: true
    },
  })
  res.json(users)
})

app.get('/likes', async (req, res) => {
  const likes = await prisma.like.findMany({
    select: {
      userId: true,
      trackId: true
    },
  })
  res.json(likes)
})

app.get('/followers', async (req, res) =>{
  const follows = await prisma.follow.findMany({
    select:{
      followerId: true,
      followingId: true
    },
  })
  res.json(follows);
})

app.post('/followers', async (req, res) => {
  const userId = req.body.userId; 
  const currentUserId = 1;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const result = await prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: Number(userId),
      },
    });
    res.json(result);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Could not follow user" });
  }
});


app.delete('/followers/:userId', async(req,res) => {
  const userId = req.body.userId
  const currentUserId = 1;

  const result = await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: Number(userId),
      },
    },
  });
  res.json(result)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
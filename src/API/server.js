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
      coverImage: true
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
      profilePicture: true
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
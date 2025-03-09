import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    // If no users exist, create 50 users
    for (let i = 0; i < 50; i++) {
      const user = await prisma.user.create({
        data: {
          username: faker.internet.username(),
          email: faker.internet.email(),
          passwordHash: faker.internet.password(),
          profilePicture: faker.image.avatar(),
          bio: faker.lorem.sentence(),
          createdAt: faker.date.recent(),
        },
      });

      // Create 20 tracks for each user
      for (let j = 0; j < 20; j++) {
        const track = await prisma.track.create({
          data: {
            userId: user.id,
            title: faker.music.songName(),
            description: faker.lorem.sentence(),
            fileUrl: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
            coverImage: faker.image.avatarGitHub(),
            duration: faker.number.int({ min: 120, max: 300 }),
            genre: faker.music.genre(),
            uploadedAt: faker.date.recent(),
          },
        });

        // Create 3 comments for each track
        for (let k = 0; k < 3; k++) {
          await prisma.comment.create({
            data: {
              content: faker.lorem.sentence(),
              trackId: track.id,
              userId: user.id,
            },
          });
        }

        // Create 5 likes for each track, ensuring no duplicates
        for (let l = 0; l < 5; l++) {
          const existingLike = await prisma.like.findUnique({
            where: {
              userId_trackId: {
                userId: user.id,
                trackId: track.id,
              },
            },
          });

          if (!existingLike) {
            await prisma.like.create({
              data: {
                trackId: track.id,
                userId: user.id,
              },
            });
          }
        }
      }

      // Create 10 playlists for each user
      for (let m = 0; m < 10; m++) {
        const playlist = await prisma.playlist.create({
          data: {
            userId: user.id,
            name: faker.lorem.words(),
            coverImage: faker.image.avatarGitHub(),
            description: faker.lorem.sentence(),
            createdAt: faker.date.recent(),
          },
        });

        // Add 10 tracks to each playlist (some could be repeated), but avoid duplicates
        for (let n = 0; n < 10; n++) {
          const randomTrack = await prisma.track.findFirst({
            where: { userId: user.id },
          });

          if (randomTrack) {
            const existingPlaylistTrack = await prisma.playlistTrack.findUnique({
              where: {
                playlistId_trackId: {
                  playlistId: playlist.id,
                  trackId: randomTrack.id,
                },
              },
            });

            if (!existingPlaylistTrack) {
              await prisma.playlistTrack.create({
                data: {
                  playlistId: playlist.id,
                  trackId: randomTrack.id,
                },
              });
            }
          }
        }
      }

      // Create followers for each user
      const allUsers = await prisma.user.findMany();
      for (const user of allUsers) {
        const followersCount = faker.number.int({ min: 1, max: 10 });
        for (let f = 0; f < followersCount; f++) {
          const randomFollower = allUsers[Math.floor(Math.random() * allUsers.length)];
          if (randomFollower.id !== user.id) {
            const existingFollow = await prisma.follow.findUnique({
              where: {
                followerId_followingId: {
                  followerId: randomFollower.id,
                  followingId: user.id,
                },
              },
            });

            if (!existingFollow) {
              await prisma.follow.create({
                data: {
                  followerId: randomFollower.id,
                  followingId: user.id,
                },
              });
            }
          }
        }
      }
    }
    console.log("Database seeded with fake data!");
  } else {
    console.log("Database already seeded with users:", users.length);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment/moment";

function FollowingPosts() {
    const [songs, setSongs] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const usersRes = await fetch("http://localhost:5001/users");
                const usersData = await usersRes.json();
                setUsers(usersData);

                const followersRes = await fetch("http://localhost:5001/followers");
                const followersData = await followersRes.json();
                const followingIds = followersData
                    .filter((follow) => follow.followerId === 1)
                    .map((follow) => follow.followingId);

                if (followingIds.length > 0) {
                    const songsRes = await fetch("http://localhost:5001/songs");
                    const songsData = await songsRes.json();
                    const filteredSongs = songsData
                        .filter((song) => followingIds.includes(song.userId))
                        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
                        .slice(0, 12);
                    setSongs(filteredSongs);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h5 className="mb-5 ms-5 ps-5 opacity-50">Hear the latest posts from the people you’re following:</h5>
            <ul className="list-unstyled">
                {songs.length > 0 ? (
                    songs.map((song) => {
                        const user = users.find((u) => u.id === song.userId);
                        return (
                            <li className="list-group-item align-items-center mb-5 ms-5 ps-5" key={song.id}>
                                <div className="d-inline-flex align-items-center mb-3 col-12">
                                    <img
                                        src={user.profilePicture}
                                        className="rounded-circle me-2 img-fluid"
                                        style={{ width: "35px", height: "35px" }}
                                    />
                                    <small className="fw-bold">{user.username}</small>
                                    <small className="ms-1 opacity-50">posted a track {moment(song.uploadedAt).fromNow()}</small>
                                </div>
                                <div className="d-inline-flex align-items-center mb-2 col-12">
                                    <img
                                        src={song.coverImage}
                                        alt={song.title}
                                        className="me-3 img-fluid"
                                        style={{ width: "170px", height: "170px" }}
                                    />
                                    <div className="d-flex flex-column">
                                    <small className="opacity-50">{user.username}</small>
                                    <span className="fw-bold "> {song.title}</span>
                                    </div>
                                </div>
                            </li>)
                    }
                    )
                ) : (
                    <li className="list-group-item">You are not following any user.</li>
                )}
            </ul>
        </div>
    );
}

export default FollowingPosts;
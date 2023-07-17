-- Active: 1689619031356@@127.0.0.1@3306
create TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    nickname TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')) NOT NULL
);

DROP TABLE users;

create TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    comments TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME ('now')) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE

);

CREATE TABLE likes_dislikes (
  user_id TEXT NOT  NULL,
  post_id TEXT NOT  NULL,
  like INTEGER NOT  NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE
  FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE
);

create TABLE comments (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE
);
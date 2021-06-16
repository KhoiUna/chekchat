# ChekChat - The app for assigning missions

## Tech stack

- Front-end: NextJS, Material UI, Vercel
- Back-end: NodeJS Express, MongoDB, Heroku

## Notes

- MongoDB:

  - Has 1 database called ChekChat
  - Database's collections: users, friends, friend_requests, missions, notifications, sessions, feedbacks

- Collections' schema:

  - **users** {
    username,
    email,
    password,
    avatarURL,
    notificationCount,
    }

  - **friends** {
    email,
    friend: {
    email,
    username,
    avatarURL
    }
    }

  - **friend_requests** {
    from: {
    email,
    username,
    avatarURL
    },
    to: {
    email,
    username,
    avatarURL
    },
    status
    }

  - **missions** {
    subject,
    due_date,
    from: {
    email,
    username,
    avatarURL
    },
    to: {
    email,
    username,
    avatarURL
    },
    description,
    status,
    completed,
    starred,
    visibility,
    sent_date
    }

  - **notifications** {
    from_user: {
    email,
    username,
    avatarURL,
    },
    to_user: {
    email,
    username,
    avatarURL
    },
    type,
    text,
    clicked,
    time
    }

  - **feedbacks** {
    subject,
    from_user,
    submitted_date,
    comment
    }

  - **sessions** {
    _store users' cookie sessions_
    }

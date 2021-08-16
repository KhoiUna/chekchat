# ChekChat - The app for assigning missions

## Tech stack

- Front-end: NextJS, Material UI, Vercel
- Back-end: NodeJS Express, MongoDB, Heroku

## Notes

- MongoDB:

  - Has 1 database called ChekChat
  - Database's collections: users, friends, friend_requests, missions, notifications, rooms, messages, sessions, feedbacks

- Collections' schema:

  - **users** {\
    username,\
    email,\
    password,\
    avatarURL,\
    notificationCount\
    }

  - **friends** {\
    userId: <_ObjectID ref to users schema_>,\
    friendId: <_ObjectID ref to users schema_>\
    }

  - **friend_requests** {\
    from_user: <_ObjectID ref to users schema_>,\
    to_user: <_ObjectID ref to users schema_>,\
    status\
    }

  - **missions** {\
    subject,\
    due_date,\
    from_user: <_ObjectID ref to users schema_>,\
    to_user: <_ObjectID ref to users schema_>,\
    description,\
    status,\
    completed,\
    starred,\
    visibility,\
    sent_date\
    }

  - **notifications** {\
    from_user: <_ObjectID ref to users schema_>,\
    to_user: <_ObjectID ref to users schema_>,\
    type,\
    text,\
    clicked,\
    time\
    }

  - **feedbacks** {\
    subject,\
    from_user,\
    submitted_date,\
    comment\
    }

  - **sessions** {\
    _store users' cookie sessions_\
    }

  - **rooms** {\
    missionId: <_ObjectID ref to missions schema_>,\
    from_user: <_ObjectID ref to users schema_>,\
    to_user: <_ObjectID ref to users schema_>,\
    notified: <_Boolean_>,\
    last_updated,\
    lastMessage\
    }

  - **messages** {\
    from_user: <_ObjectID ref to users schema_>,\
    roomId: <_ObjectID ref to rooms schema_>,\
    sent_datetime: <_Date_>
    message\
    }
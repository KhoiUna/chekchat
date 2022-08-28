# MongoDB

- Has 1 database called `chekchat`
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
    from*user: <\_ObjectID ref to users schema*>,\
    to*user: <\_ObjectID ref to users schema*>,\
    status\
    }

  - **missions** {\
    subject,\
    due*date,\
    from_user: <\_ObjectID ref to users schema*>,\
    to*user: <\_ObjectID ref to users schema*>,\
    description,\
    status,\
    completed,\
    starred,\
    visibility,\
    sent_date\
    }

  - **notifications** {\
    from*user: <\_ObjectID ref to users schema*>,\
    to*user: <\_ObjectID ref to users schema*>,\
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
    from*user: <\_ObjectID ref to users schema*>,\
    to*user: <\_ObjectID ref to users schema*>,\
    notified: <_Boolean_>,\
    last_updated,\
    lastMessage\
    }

  - **messages** {\
    from*user: <\_ObjectID ref to users schema*>,\
    roomId: <_ObjectID ref to rooms schema_>,\
    sent*datetime: <\_Date*>,\
    message\
    }

module.exports = {
  forNotification(time) {
    time = new Date(time);
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let timeRecordStr;

    if (
      new Date().getDate() - date === 1 &&
      new Date().getMonth() - time.getMonth() === 0 &&
      new Date().getFullYear() - time.getFullYear() === 0
    ) {
      timeRecordStr = "Yesterday";
    } else if (
      new Date().getDate() - date === 0 &&
      new Date().getMonth() - time.getMonth() === 0 &&
      new Date().getFullYear() - time.getFullYear() === 0
    ) {
      timeRecordStr = "Today";
    } else {
      if (date < 10) {
        date = `0${date}`;
      }
      if (month < 11) {
        month = `0${month}`;
      }
      timeRecordStr = `${time.toString().slice(0, 3)} ${month}/${date}`;
    }

    if (timeRecordStr === "Today") {
      const hourDiff = new Date().getHours() - new Date(time).getHours();
      timeRecordStr = `${hourDiff} hour${hourDiff > 1 ? "s" : ""} ago`;

      if (hourDiff === 0) {
        const minuteDiff =
          new Date().getMinutes() - new Date(time).getMinutes();
        timeRecordStr = `${minuteDiff} minute${minuteDiff > 1 ? "s" : ""} ago`;

        if (minuteDiff === 0) {
          const secondDiff =
            new Date().getSeconds() - new Date(time).getSeconds();
          timeRecordStr = `${secondDiff} second${
            secondDiff > 1 ? "s" : ""
          } ago`;
        }
      }
    }

    return timeRecordStr;
  },

  forTodoAndMissions(date) {
    const hour =
      new Date(date).getHours() > 12
        ? new Date(date).getHours() - 12
        : new Date(date).getHours();

    const minute =
      new Date(date).getMinutes() < 10
        ? `0${new Date(date).getMinutes()}`
        : new Date(date).getMinutes();

    return `${hour}:${minute} ${new Date(date).toLocaleTimeString().slice(-2)}`;
  },

  forChatbox(time) {
    let date = new Date(time);
    let hour = date.getHours();
    let min = date.getMinutes().toString();
    if (min < 10) {
      min = "0" + min;
    }
    let nameTimeStr;
    if (hour > 12) {
      nameTimeStr = `${hour - 12}:${min}pm`;
    } else if (hour === 12) {
      nameTimeStr = `12:${min}pm`;
    } else {
      nameTimeStr = `${hour}:${min}am`;
    }
    return nameTimeStr;
  },

  forDateDivider(time) {
    time = new Date(time);
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let timeRecordStr;

    if (
      new Date().getDate() - date === 1 &&
      new Date().getMonth() - time.getMonth() === 0 &&
      new Date().getFullYear() - time.getFullYear() === 0
    ) {
      timeRecordStr = "Yesterday";
    } else if (
      new Date().getDate() - date === 0 &&
      new Date().getMonth() - time.getMonth() === 0 &&
      new Date().getFullYear() - time.getFullYear() === 0
    ) {
      timeRecordStr = "Today";
    } else {
      if (date < 10) {
        date = `0${date}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      timeRecordStr = `${time.toString().slice(0, 3)} ${month}/${date}`;
    }
    return timeRecordStr;
  },
};

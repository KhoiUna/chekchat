import { origin } from "../config/config";

export default class FeedbackUtil {
  static async submitFeedback(feedbackObj) {
    try {
      console.log(feedbackObj);
      const res = await fetch(`${origin}/api/user/feedback`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackObj),
      });
      return res;
    } catch (err) {
      console.error("Error submitting feedback");
    }
  }
}

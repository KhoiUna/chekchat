export default function stringifyCookies(cookieObj) {
  let cookieString = "";
  for (let i of Object.keys(cookieObj)) {
    cookieString += i + "=" + cookieObj[i];
  }
  return cookieString;
}

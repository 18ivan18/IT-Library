export const redirect = (path = "/") => {
  if (path === getCurrentURL()) return;
  // const baseUrl = window.location.href;
  // const arr = baseUrl.split("/");
  // console.log("last word", arr[arr.length - 2]);
  // const lastWord = arr[arr.length - 2];
  // if (lastWord !== "localhost:3001") {
  //   window.location.href = "http://localhost:3001/";
  // }
  history.pushState(null, "", path);
  window.dispatchEvent(new Event("navigate"));
  document.documentElement.scrollTop = 0;
};

export const getCurrentURL = () => {
  return window.location.href;
};

export const isLate = (date, daysToBeHeld) => {
  if (!date) return false;
  if (!daysToBeHeld) return false;
  const takenDate = new Date(date);
  const returnDate = daysToBeHeld * 24 * 60 * 60 * 1000 + +takenDate;
  const now = new Date();
  return now > returnDate;
};

export const scroll = () => {
  window.scrollTo({
    top: 100,
    left: 100,
    behavior: "smooth",
  });
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getDateFormat = (dateObj) => {
  let result = dateObj.getDay() + 1;
  const lastDigit = parseInt(dateObj.getDay() + 1) % 10;
  if (lastDigit === 1) {
    result += "st";
  } else if (lastDigit === 2) {
    result += "nd";
  } else if (lastDigit === 3) {
    result += "rd";
  } else {
    result += "th";
  }
  result += ` of ${monthNames[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
  return result;
};

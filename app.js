let author = window.document.getElementById("author");
let commitDate = window.document.getElementById("date");
let taskNumber = window.document.getElementById("task_number");
let taskItemNumber = window.document.getElementById("task_item_number");
let btn = window.document.getElementById("copy");
let isClicked = false;
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    saveAndCopy();
  } else if (e.ctrlKey && e.key === "c") {
    e.preventDefault();
    saveAndCopy();
  }
});
window.addEventListener("load", (event) => {
  if (typeof localStorage.getItem("init") !== "undefined") {
    author.value = localStorage.getItem("author");
    taskNumber.value = localStorage.getItem("taskNumber");
    taskItemNumber.value = localStorage.getItem("taskItemNumber");
    taskNumber.focus();
  } else {
    author.focus();
  }
  commitDate.value = getCurrentTime();
});

function getCurrentTime() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let options = {
      timeZone: timezone,
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    },
    formatter = new Intl.DateTimeFormat([], options);
  return reformatTimeString(formatter.format(new Date()));
}

function reformatTimeString(str) {
  let temp = "";
  let ymd = str.slice(0, 10);
  ymd = ymd.split(".");
  if (ymd[0].length !== 4) {
    temp = ymd[2] + ymd[1] + ymd[0];
  } else {
    temp = ymd[0] + ymd[1] + ymd[2];
  }
  let hms = str.slice(11, 19).split(":");
  temp += "-" + hms[0] + hms[1] + hms[2];
  return temp;
}

function saveAndCopy() {
  if (isClicked) return;
  let all =
    author.value +
    "-" +
    commitDate.value +
    "-" +
    taskNumber.value +
    "-" +
    taskItemNumber.value;
  if (author.value !== "") {
    localStorage.setItem("init", 1);
    localStorage.setItem("author", author.value);
    localStorage.setItem("taskNumber", taskNumber.value);
    localStorage.setItem("taskItemNumber", taskItemNumber.value);
  }

  navigator.clipboard.writeText(all);
  author.blur();
  let oldBtnHtml = btn.innerHTML;
  btn.innerHTML = "Copied!";
  btn.style.pointerEvents = "none";
  isClicked = true;
  setTimeout(() => {
    btn.innerHTML = oldBtnHtml;
    isClicked = false;
    btn.style.pointerEvents = "auto";
  }, 3000);
}

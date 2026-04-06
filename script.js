// Elements
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const savedList = document.getElementById("savedList");
const langSelect = document.getElementById("language");
const themeToggle = document.getElementById("themeToggle");

// =======================
// Urdu Quotes
// =======================
const urduQuotes = [
  { text: "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے", author: "علامہ محمد اقبال" },
  { text: "بول کہ لب آزاد ہیں تیرے", author: "فیض احمد فیض" },
  { text: "یہ داغ داغ اجالا، یہ شب گزیدہ سحر", author: "فیض احمد فیض" },
  { text: "دل ہی تو ہے نہ سنگ و خشت، درد سے بھر نہ آئے کیوں", author: "مرزا غالب" },
  { text: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے", author: "مرزا غالب" },
  { text: "میں تنہا تھا، مگر اتنا بھی نہیں تھا", author: "جون ایلیا" },
  { text: "ہم کو ان سے وفا کی ہے امید جو نہیں جانتے وفا کیا ہے", author: "مرزا غالب" },
  { text: "رنجش ہی سہی، دل ہی دکھانے کے لیے آ", author: "احمد فراز" },
  { text: "سچ لکھوں تو جل جاتے ہیں چہرے، جھوٹ لکھوں تو لفظ مر جاتے ہیں", author: "جون ایلیا" }
];

// =======================
// English fallback Quotes
// =======================
const engQuotes = [
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "Do what you can, with what you have.", author: "Theodore Roosevelt" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" }
];

// =======================
// Get Quote
// =======================
async function getQuote() {
  const lang = langSelect.value;

  // Urdu Mode
  if (lang === "ur") {
    document.body.setAttribute("dir", "rtl");
    const q = urduQuotes[Math.floor(Math.random() * urduQuotes.length)];
    showQuote(q.text, q.author);
    return;
  }

  // English Mode
  document.body.setAttribute("dir", "ltr");

  try {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();
    const random = data[Math.floor(Math.random() * data.length)];
    showQuote(random.text, random.author || "Unknown");
  } catch {
    // Fallback English quotes
    const q = engQuotes[Math.floor(Math.random() * engQuotes.length)];
    showQuote(q.text, q.author);
  }
}

// =======================
// Show Quote (Animation)
// =======================
function showQuote(text, author) {
  const box = document.querySelector(".quote-box");

  box.classList.remove("fade");
  void box.offsetWidth;
  box.classList.add("fade");

  quoteEl.innerText = text;
  authorEl.innerText = "- " + author;
}

// =======================
// Copy Quote
// =======================
function copyQuote() {
  navigator.clipboard.writeText(quoteEl.innerText);
  alert("Copied!");
}

// =======================
// Save Quote
// =======================
function saveQuote() {
  const quote = quoteEl.innerText;

  let saved = JSON.parse(localStorage.getItem("quotes")) || [];

  if (!saved.includes(quote)) {
    saved.push(quote);
    localStorage.setItem("quotes", JSON.stringify(saved));
    displaySaved();
  } else {
    alert("Already saved 😏");
  }
}

// =======================
// Display Saved Quotes
// =======================
function displaySaved() {
  savedList.innerHTML = "";
  let saved = JSON.parse(localStorage.getItem("quotes")) || [];

  saved.forEach((q, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${q} <button onclick="deleteQuote(${index})">❌</button>
    `;
    savedList.appendChild(li);
  });
}

// =======================
// Delete Quote
// =======================
function deleteQuote(index) {
  let saved = JSON.parse(localStorage.getItem("quotes")) || [];
  saved.splice(index, 1);
  localStorage.setItem("quotes", JSON.stringify(saved));
  displaySaved();
}

// =======================
// Theme Toggle (Auto Text Color)
// =======================
themeToggle.onclick = () => {
  document.body.classList.toggle("light");

  // Change button icon
  if (document.body.classList.contains("light")) {
    themeToggle.innerText = "☀️";
  } else {
    themeToggle.innerText = "🌙";
  }
};

// =======================
// Init
// =======================
getQuote();
displaySaved();
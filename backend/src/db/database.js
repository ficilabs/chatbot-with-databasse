const Database = require("better-sqlite3");
const path = require("path");

// init database
const db = new Database(path.join(__dirname, "app.db"));

// create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    note TEXT
  )
`).run();

// helper
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// random data
const names = [
  "Andi", "Budi", "Siti", "Aisyah", "Rizky",
  "Dewi", "Fajar", "Nabila", "Agus", "Putri"
];

const roles = ["admin", "user", "editor", "guest"];

const notes = [
  "Active user",
  "New member",
  "Top contributor",
  "Needs review",
  null
];

// generate random user
function generateRandomUser() {
  return {
    name: randomFromArray(names),
    role: randomFromArray(roles),
    note: randomFromArray(notes),
  };
}

// insert random user
const insertUser = db.prepare(`
  INSERT INTO users (name, role, note)
  VALUES (@name, @role, @note)
`);

// generate 1 user
const user = generateRandomUser();
insertUser.run(user);

console.log("Random user inserted:", user);

// generate many users (optional)
for (let i = 0; i < 5; i++) {
  insertUser.run(generateRandomUser());
}

console.log("5 more random users inserted");

module.exports = db;
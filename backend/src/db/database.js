const { Pool } = require("pg");
const { DATABASE_URL } = require("../config/env");

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

function generateRandomUser() {
  return {
    name: randomFromArray(names),
    role: randomFromArray(roles),
    note: randomFromArray(notes)
  };
}

async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      note TEXT
    )
  `);
}

// initialize table on startup
initDatabase()
  .then(async () => {
    const user = generateRandomUser();
    await pool.query(
      "INSERT INTO users (name, role, note) VALUES ($1, $2, $3)",
      [user.name, user.role, user.note]
    );
    console.log("Random user inserted:", user);
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
  });

module.exports = pool;

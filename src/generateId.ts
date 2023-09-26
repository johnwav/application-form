export default function generateUniqueId() {
  // Generate a timestamp
  const timestamp = Date.now().toString();

  // Generate a random number (between 0 and 9999) and pad it with zeros
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  // Combine timestamp and random number to create a unique ID
  const uniqueId = timestamp + random;

  return { uniqueId };
}

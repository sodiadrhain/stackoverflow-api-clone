export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomChar = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return chars.charAt(getRandomInt(0, chars.length - 1));
};

export const getRandomString = (length: number): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += getRandomChar();
  }
  return result;
};

export const generateRandomEmail = (): string => {
  const usernameLength = getRandomInt(5, 10);
  const domainLength = getRandomInt(3, 7);
  const tldLength = getRandomInt(2, 3);

  const username = getRandomString(usernameLength);
  const domain = getRandomString(domainLength);
  const tld = getRandomString(tldLength);

  return `${username}@${domain}.${tld}`;
};

export const getRandomCharFromSet = (charSet: string): string => {
  return charSet.charAt(getRandomInt(0, charSet.length - 1));
};

export const generateStrongPassword = (length: number): string => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (length < 8) {
    throw new Error("Password length should be at least 8 characters");
  }

  const allChars = lowercase + uppercase + numbers + specialChars;
  let password = "";

  // Ensure the password contains at least one character from each set
  password += getRandomCharFromSet(lowercase);
  password += getRandomCharFromSet(uppercase);
  password += getRandomCharFromSet(numbers);
  password += getRandomCharFromSet(specialChars);

  // Fill the rest of the password length with random characters from all sets
  for (let i = 4; i < length; i++) {
    password += getRandomCharFromSet(allChars);
  }

  // Shuffle the password to ensure randomness
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};

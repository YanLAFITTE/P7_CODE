///////////////////

////password=mockHash=aze123
const mockHash = "$2b$10$mnBC96dtlABP/N2fpGKvWuXz99gSs4LpnJRFpKClnwZuPUdgUmOuS"
const yan = {
  email: "yan@gmail.com",
  password: mockHash,
};
const alexis = {
  email: "alexis@gmail.com",
  password: mockHash,
};
const robert = {
  email: "robert@gmail.com",
  password: mockHash,
};
const users = [yan, alexis, robert];

////////////////////

module.exports = { users };

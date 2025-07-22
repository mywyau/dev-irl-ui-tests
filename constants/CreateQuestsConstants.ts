// ./constants/CreateQuestsConstants.ts

const ranks = [
  "Bronze",
  "Iron",
  "Steel",
  "Mithril",
  "Adamantite",
  "Runic",
  "Demonic",
  "Runious",
  "Aether",
];

export const testQuests = (length: number) => Array.from({ length: length }, (_, i) => ({
  title: `Quest ${i + 1}`,
  description: `Some description for quest ${i + 1}`,
  criteria: `Some acceptance criteria ${i + 1}`,
  rank: ranks[i % ranks.length],
}));

// export const testQuests = {
//   title1: "Quest 1",
//   description1: "Some description for quest 1",
//   criteria1: "Some acceptance criteria 1",
//   rank1: "Mithril",

//   title2: "Quest 2",
//   description2: "Some description for quest 2",
//   criteria2: "Some acceptance criteria 2",
//   rank2: "Demon",

//   title3: "Quest 3",
//   description3: "Some description for quest 3",
//   criteria3: "Some acceptance criteria 3",
//   rank3: "Aether",
// };

export const uploadFileTestQuests = {
  title1: "Upload File Quest 1",
  description1: "Some description for quest 1",
  criteria1: "Some acceptance criteria 1",
  rank1: "Mithril",

  title2: "Upload File Quest 2",
  description2: "Some description for quest 2",
  criteria2: "Some acceptance criteria 2",
  rank2: "Demon",

  title3: "Upload File Quest 3",
  description3: "Some description for quest 3",
  criteria3: "Some acceptance criteria 3",
  rank3: "Aether",
};

export const questPageHeadings = {
  createANewQuest: "Create a New Quest",
  allAvailableOpenQuests: "All Available Quests",
};

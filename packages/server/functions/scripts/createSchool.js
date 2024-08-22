const { rl, prompt } = require("./interface");
const { firestore } = require("./firebase");

const main = async () => {
  const isLive = await prompt("live server (y/n): ");
  const name = await prompt("Name: ");
  const emailDomainsRaw = await prompt("Email Domains: ");
  const emailDomains = emailDomainsRaw.split(",").map((s) => s.trim());

  if (!isLive) {
    firestore.settings({
      host: "localhost:8080",
      ssl: false,
    });
  }

  try {
    await firestore.collection("school").add({
      name,
      emailDomains,
    });
  } catch (error) {
    console.log(error);
  }
  rl.close();
};

main();

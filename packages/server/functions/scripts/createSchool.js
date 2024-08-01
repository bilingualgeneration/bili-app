const {rl, prompt} = require('./interface');
const {
    firestore,
    firestoreEmulator,
} = require('./firebase');

const main = async () => {
    const isLive = await prompt('live server (y/n): ');
    const name = await prompt('Name: ');
    const emailDomainsRaw = await prompt('Email Domains: ');
    const emailDomains = emailDomainsRaw.split(',').map((s) => s.trim());

    const f = isLive === 'y' ? firestore : firestoreEmulator;
    await f
	.collection('schools')
	.add({
	    name,
	    emailDomains
	    });
    rl.close();
};

main();

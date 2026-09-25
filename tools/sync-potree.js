// Copies the Potree build output into libs/potree, where index.html loads it from.
//
// Potree is developed in a sibling checkout (../potree by default). Build it there
// with `npm start` or `npm run build`, and this copies the result across.
//
//   node tools/sync-potree.js                 sync from ../potree
//   node tools/sync-potree.js ../some/potree  sync from somewhere else
//   node tools/sync-potree.js --soft          warn instead of failing (used at launch)
//
// libs/potree is generated. Anything edited there by hand is overwritten.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const soft = args.includes('--soft');
const given = args.find(a => !a.startsWith('--'));

const root = path.join(__dirname, '..');
const checkout = given ? path.resolve(given) : path.join(root, '..', 'potree');
const source = path.join(checkout, 'build', 'potree');
const target = path.join(root, 'libs', 'potree');

function bail(message) {
	// At launch time a missing checkout must not stop the app: libs/potree still
	// holds the previous sync, which is better than not starting at all.
	if (soft) {
		console.warn('sync-potree: ' + message);
		console.warn('sync-potree: launching with the existing libs/potree instead.');
		process.exit(0);
	}
	console.error('sync-potree: ' + message);
	process.exit(1);
}

if (!fs.existsSync(path.join(source, 'potree.js'))) {
	bail(`no Potree build at ${source}\n` +
	     `  Run "npm install" (or "npm start") in ${checkout} to build it first.`);
}

if (!fs.existsSync(path.join(root, 'libs'))) {
	bail(`this does not look like a PotreeDesktop checkout: ${root}`);
}

try {
	fs.rmSync(target, {recursive: true, force: true});
	fs.cpSync(source, target, {recursive: true});
} catch (e) {
	bail(`copy failed: ${e.message}`);
}

console.log(`sync-potree: ${source} -> libs/potree`);

// Checks all content without building the site: `npm run validate`.
import { validateContent } from '../src/lib/content.mjs';

const { errors } = validateContent();
if (errors.length) {
  console.error(`Content check failed with ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('Content check passed.');

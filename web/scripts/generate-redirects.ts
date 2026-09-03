import fs from 'node:fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local', override: true });

const generateRedirects = async () => {
  try {
    const { getAllRedirects } = await import('../sanity/interface/redirects');
    const redirects = await getAllRedirects();
    fs.writeFileSync(
      './sanity/interface/redirects.json',
      `${JSON.stringify(redirects, null, 2)}\n`,
    );
  } catch (error) {
    console.error('Failed generating redirects');
    console.error(error);
    process.exit(1);
  }
};

generateRedirects();

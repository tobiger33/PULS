import { cp, mkdir } from 'node:fs/promises';
// Preserve existing research URLs and the immutable before-migration reference.
for (const folder of ['research', 'score-lab', 'docs', 'reference']) {
  await mkdir('dist/' + folder, { recursive: true });
  await cp(folder, 'dist/' + folder, { recursive: true });
}

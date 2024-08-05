import { exec } from 'child_process';
import glob from "fast-glob";

const files = glob.sync("build/**/*.html");
const command = `npx subfont ${files.join(' ')} -i --root build --inline-css`;

exec(command, (error, stdout, stderr) => {
  if (error || stderr) {
    console.error(error?.message || stderr);
    return;
  }

  console.log(stdout);
})
import fs from "fs";
import path from "path";

function countCssClasses(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`file ${filePath} does not exist`);
    return;
  }

  const cssContent = fs.readFileSync(filePath, "utf-8");

  // use RegExp to match CSS classes
  const classPattern = /\.[-_a-zA-Z0-9]+[^{]*{/g;
  const classes = cssContent.match(classPattern);

  if (!classes) {
    console.log("no CSS classes found");
    return;
  }

  // calculate the number of unique classes
  const uniqueClasses = new Set(classes);

  console.log(`total classes: ${classes.length}`);
  console.log(`unique classes: ${uniqueClasses.size}`);
}

// example usage
const cssFilePath = path.join(process.cwd(), "output.css"); // replace with your CSS file path
countCssClasses(cssFilePath);

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function cssToObjectArray(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`file ${filePath} does not exist`);
    return;
  }

  let cssContent = fs.readFileSync(filePath, "utf-8");

  // remove CSS comments
  cssContent = cssContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");

  // match class selectors and their properties, support multi-line
  const classRegex = /([^{}]+)\s*{\s*([^{}]+)\s*}/g;
  const cssArray = [];
  const processedClasses = new Set(); // track processed class names

  let match;
  while ((match = classRegex.exec(cssContent)) !== null) {
    let selectors = match[1]
      .replace(/\s*\n\s*/g, " ")
      .trim()
      .split(",");
    let properties = match[2].trim();

    selectors.forEach((selector) => {
      selector = selector.trim();
      if (
        selector.startsWith(".") ||
        selector === "*" ||
        selector.startsWith("::")
      ) {
        let className = selector.startsWith(".") ? selector.slice(1) : selector;

        // deal with escaped colons and backslashes
        className = className.replace(/\\:/g, ":").replace(/\\/g, "");

        // remove >:not([hidden])~:not([hidden]) suffix
        className = className.replace(
          />:not\(\[hidden\]\)~:not\(\[hidden\]\)$/,
          ""
        );

        // if there's still a separate :not([hidden])~:not([hidden]) suffix, remove it
        className = className.replace(
          /:not\(\[hidden\]\)~:not\(\[hidden\]\)$/,
          ""
        );

        // remove ::-moz-placeholder and ::placeholder suffix
        const baseClassName = className
          .replace(/::?-moz-placeholder$/, "")
          .replace(/::placeholder$/, "");

        // if the base class name has been processed, skip it
        if (processedClasses.has(baseClassName)) {
          return;
        }

        const propsString = properties
          .split(";")
          .map((prop) => {
            const [key, value] = prop.split(":").map((item) => item.trim());
            return key && value ? `${key}:${value}` : null;
          })
          .filter(Boolean)
          .join(";");

        if (propsString) {
          cssArray.push({ c: baseClassName, p: propsString });
          processedClasses.add(baseClassName); // record processed class names
        }
      }
    });
  }

  return cssArray;
}

function saveCssArrayToFile(cssArray, outputPath) {
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const jsonContent = JSON.stringify(cssArray);
  fs.writeFileSync(outputPath, jsonContent);

  const fileSizeInBytes = fs.statSync(outputPath).size;
  const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);

  console.log(`Compressed JSON saved to ${outputPath}`);
  console.log(`File size: ${fileSizeInMB} MB`);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssFilePath = path.join(__dirname, "output.css");
const jsonFilePath = path.join(__dirname, "dist", "output.min.json");

const cssArray = cssToObjectArray(cssFilePath);
if (cssArray) {
  saveCssArrayToFile(cssArray, jsonFilePath);
  console.log("Process completed");
}

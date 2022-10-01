import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection";
import path from "path";

const container = () => {
  // Absolute Path: All dependencies start from /src/**...
  const srcDir = path.join(__dirname, "..", "..", "..");
  console.log(srcDir);
  const container = new ContainerBuilder(true, srcDir);
  const loader = new YamlFileLoader(container);
  const env = process.env.NODE_ENV || "development";

  try {
    console.log(`Loading dependencies from environment '${env}' `);
    const dir = `${__dirname.replace("dist/", "")}/application_${env}.yaml`;
    console.log(dir);
    loader.load(dir);
  } catch (e) {
    console.log("[Dependency Injection]: Errors...");
    console.log(e);
  }

  return container;
};

export {container};

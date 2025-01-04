import prettier from "prettier/standalone";
import parserTypeScript from "prettier/plugins/typescript";
import parserEstree from "prettier/plugins/estree";
const prettierConfig = {
  singleQuote: false,
  printWidth: 80,
};

/**
 * Formats TypeScript code using Prettier.
 * @param code - The TypeScript code to format.
 * @returns The formatted TypeScript code.
 */
const formatCode = async (code: string, lang: "json" | "typescript") => {
  const parser = lang === "json" ? "json" : "typescript";
  const plugins = lang === "json" ? [] : [parserTypeScript, parserEstree]
  try {
    return await prettier.format(code, {
      parser,
      plugins,
      ...prettierConfig,
    });
  } catch (error) {

    return code; // Return the original code if formatting fails
  }
};

export default formatCode;

import * as fs from "node:fs"

interface Config {
  name: string
  primary: string
  secondary: string
  info: string
  success: string
  warning: string
  error: string
  neutralName?: string
  neutral?: string
  uiRadius: string
}

interface Colors {
  "50": string
  "100": string
  "200": string
  "300": string
  "400": string
  "500": string
  "600": string
  "700": string
  "800": string
  "900": string
  "950": string
}

interface ApiResponse {
  color: Colors
}

async function getColor(hex: string) {
  const colors = await fetch(`https://www.tints.dev/api/color/${hex}`) // the color is our color name
    .then((res) => res.json() as Promise<ApiResponse>)
    .then((data) => data.color) // must match above

  console.log("successfully get colors for", hex)
  return colors
}

async function getCss(config: Config) {
  const primary = await getColor(config.primary)
  const secondary = await getColor(config.secondary)
  const info = await getColor(config.info)
  const success = await getColor(config.success)
  const warning = await getColor(config.warning)
  const error = await getColor(config.error)

  let neutrals: string

  if (config.neutralName) {
    neutrals = `
    --ui-color-neutral-50: var(--color-${config.neutralName}-50);
    --ui-color-neutral-100: var(--color-${config.neutralName}-100);
    --ui-color-neutral-200: var(--color-${config.neutralName}-200);
    --ui-color-neutral-300: var(--color-${config.neutralName}-300);
    --ui-color-neutral-400: var(--color-${config.neutralName}-400);
    --ui-color-neutral-500: var(--color-${config.neutralName}-500);
    --ui-color-neutral-600: var(--color-${config.neutralName}-600);
    --ui-color-neutral-700: var(--color-${config.neutralName}-700);
    --ui-color-neutral-800: var(--color-${config.neutralName}-800);
    --ui-color-neutral-900: var(--color-${config.neutralName}-900);
    --ui-color-neutral-950: var(--color-${config.neutralName}-950);
  `
  } else {
    const neutral = await getColor(config.neutral)
    neutrals = `
    --ui-color-neutral-50: ${neutral["50"]};
    --ui-color-neutral-100: ${neutral["100"]};
    --ui-color-neutral-200: ${neutral["200"]};
    --ui-color-neutral-300: ${neutral["300"]};
    --ui-color-neutral-400: ${neutral["400"]};
    --ui-color-neutral-500: ${neutral["500"]};
    --ui-color-neutral-600: ${neutral["600"]};
    --ui-color-neutral-700: ${neutral["700"]};
    --ui-color-neutral-800: ${neutral["800"]};
    --ui-color-neutral-900: ${neutral["900"]};
    --ui-color-neutral-950: ${neutral["950"]};
  `
  }

  return `
@import "tailwindcss";
@import "@nuxt/ui";

@layer components {
  /* https://www.tints.dev */
  [data-theme="${config.name}"] {
    --ui-radius: ${config.uiRadius};

    --ui-color-primary-50: ${primary["50"]};
    --ui-color-primary-100: ${primary["100"]};
    --ui-color-primary-200: ${primary["200"]};
    --ui-color-primary-300: ${primary["300"]};
    --ui-color-primary-400: ${primary["400"]};
    --ui-color-primary-500: ${primary["500"]};
    --ui-color-primary-600: ${primary["600"]};
    --ui-color-primary-700: ${primary["700"]};
    --ui-color-primary-800: ${primary["800"]};
    --ui-color-primary-900: ${primary["900"]};
    --ui-color-primary-950: ${primary["950"]};

    --ui-color-secondary-50: ${secondary["50"]};
    --ui-color-secondary-100: ${secondary["100"]};
    --ui-color-secondary-200: ${secondary["200"]};
    --ui-color-secondary-300: ${secondary["300"]};
    --ui-color-secondary-400: ${secondary["400"]};
    --ui-color-secondary-500: ${secondary["500"]};
    --ui-color-secondary-600: ${secondary["600"]};
    --ui-color-secondary-700: ${secondary["700"]};
    --ui-color-secondary-800: ${secondary["800"]};
    --ui-color-secondary-900: ${secondary["900"]};
    --ui-color-secondary-950: ${secondary["950"]};

    --ui-color-info-50: ${info["50"]};
    --ui-color-info-100: ${info["100"]};
    --ui-color-info-200: ${info["200"]};
    --ui-color-info-300: ${info["300"]};
    --ui-color-info-400: ${info["400"]};
    --ui-color-info-500: ${info["500"]};
    --ui-color-info-600: ${info["600"]};
    --ui-color-info-700: ${info["700"]};    
    --ui-color-info-800: ${info["800"]};
    --ui-color-info-900: ${info["900"]};
    --ui-color-info-950: ${info["950"]};

    --ui-color-success-50: ${success["50"]};
    --ui-color-success-100: ${success["100"]};
    --ui-color-success-200: ${success["200"]};
    --ui-color-success-300: ${success["300"]};
    --ui-color-success-400: ${success["400"]};
    --ui-color-success-500: ${success["500"]};
    --ui-color-success-600: ${success["600"]};
    --ui-color-success-700: ${success["700"]};
    --ui-color-success-800: ${success["800"]};
    --ui-color-success-900: ${success["900"]};
    --ui-color-success-950: ${success["950"]};

    --ui-color-warning-50: ${warning["50"]};
    --ui-color-warning-100: ${warning["100"]};
    --ui-color-warning-200: ${warning["200"]};
    --ui-color-warning-300: ${warning["300"]};
    --ui-color-warning-400: ${warning["400"]};
    --ui-color-warning-500: ${warning["500"]};
    --ui-color-warning-600: ${warning["600"]};
    --ui-color-warning-700: ${warning["700"]};
    --ui-color-warning-800: ${warning["800"]};
    --ui-color-warning-900: ${warning["900"]};
    --ui-color-warning-950: ${warning["950"]};

    --ui-color-error-50: ${error["50"]};
    --ui-color-error-100: ${error["100"]};
    --ui-color-error-200: ${error["200"]};
    --ui-color-error-300: ${error["300"]};
    --ui-color-error-400: ${error["400"]};
    --ui-color-error-500: ${error["500"]};
    --ui-color-error-600: ${error["600"]};
    --ui-color-error-700: ${error["700"]};
    --ui-color-error-800: ${error["800"]};
    --ui-color-error-900: ${error["900"]};
    --ui-color-error-950: ${error["950"]};

${neutrals}
  }
}`
}

async function main() {
  const configs = [
    {
      name: "netease",
      primary: "ea3e3e", //ea3e3e fc3d4a
      secondary: "5e7cbd",
      info: "17a2b8",
      success: "28a745",
      warning: "ffc107",
      error: "dc3545",
      neutral: "737a8a", //13131a f7f9fc
      uiRadius: "0.25rem",
    },
    {
      name: "soundcloud",
      primary: "ff5500", // SoundCloud's signature orange
      secondary: "ff5500", // Using Spotify green as secondary for contrast
      info: "17a2b8",
      success: "28a745",
      warning: "ffc107",
      error: "dc3545",
      neutralName: "zinc",
      uiRadius: "0.125rem",
    },
    {
      name: "spotify",
      primary: "65dc8f", // Spotify's signature green
      secondary: "65dc8f", // Using SoundCloud orange as secondary for contrast
      info: "17a2b8",
      success: "28a745",
      warning: "ffc107",
      error: "dc3545",
      neutralName: "zinc",
      uiRadius: "0.5rem",
    },
  ]

  for (const config of configs) {
    console.log(`Creating theme ${config.name}...`)

    const css = await getCss(config)

    const path = `./src/assets/themes/${config.name}.css`
    fs.writeFileSync(path, css)

    console.log(`Theme ${config.name} created at ${path}!`)
  }
}

main()

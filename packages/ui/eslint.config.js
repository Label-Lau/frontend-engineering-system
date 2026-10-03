// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook"

import reactConfig from "@frontend-engineering-system-lyz/eslint-config/react"

export default [...reactConfig, ...storybook.configs["flat/recommended"]]
# Mind the Badge - Visualization Badges Experiment

This repository contains a reVISit-based experiment examining visualization badges and their impact on user trust and understanding.

## Experiment Overview

The experiment consists of two main conditions:
1. **Condition 1**: Single badge awareness test
2. **Condition 2**: Multiple badges usability test

## Live Version

The experiment is deployed at: [https://valentinedelsbrunner.github.io/mind-the-badge/](https://valentinedelsbrunner.github.io/mind-the-badge/)

## Local Development

To run the experiment locally:

```bash
# Install dependencies
npm install

# Start development server
npm run serve
```

The experiment will be available at `http://localhost:8080`

## Deployment

This experiment is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. Builds the project using `npm run build`
2. Deploys the built files to the `gh-pages` branch
3. Makes the experiment available at `https://valentinedelsbrunner.github.io/mind-the-badge/`

## Experiment Structure

- **Introduction**: Welcome and study overview
- **Consent**: Informed consent form
- **Condition 1 Task**: Information-seeking questions with single badge
- **Badge Awareness**: Questions about badge noticeability
- **Badge Onboarding**: Educational content about visualization badges
- **Condition 2 Multiple Badges**: Trust and understanding questions with 5 badges
- **Demographics**: Age, gender, and education questions
- **SUS Survey**: System Usability Scale contextualized for visualization badges

## Features

- **Interactive badges**: Clickable badges with detailed information panels
- **Responsive design**: Works on desktop and mobile devices
- **Data collection**: Comprehensive survey with standardized metrics
- **Professional UI**: Clean, modern interface following reVISit best practices

## Technologies

- **reVISit**: Survey framework
- **React**: Frontend framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **GitHub Pages**: Hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.# Trigger deployment
 

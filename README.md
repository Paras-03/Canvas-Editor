# React Canvas Editor

This is a React-based application that allows users to choose between two different design approaches: **React + CSS** and **Chakra UI**. Once selected, the user is directed to the respective design page where they can interact with the UI.

## Features

- **Homepage**: Offers the option to choose between **React + CSS** design and **Chakra UI** design.
- **React + CSS**: A simple design using React and traditional CSS for styling.
- **Chakra UI**: A modern design using Chakra UI, a simple, modular, and accessible component library.
- **Undo/Redo functionality**: The text elements on the canvas can be moved with drag-and-drop functionality, and changes can be undone or redone.
- **Custom Text Styling**: Users can add, edit, and style text elements on the canvas, with options for font family, size, weight, style, and text alignment.

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

### Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine. You can check if it's installed by running `node -v` in your terminal.

### Installation

1. Open the terminal.
2. Navigate to the project directory:
    ```bash
    cd path/to/project-folder
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Once all the node modules are installed, start the development server:
    ```bash
    npm start
    ```

This will start the app, and you can view it in your browser at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/`
  - `App.js`: The main entry point for the application, containing routing logic.
  - `HomePage.js`: The homepage component with buttons to select the design.
  - `ReactCSSDesign.js`: The component for the React + CSS design.
  - `ChakraUIDesign.js`: The component for the Chakra UI design.
  - `HomePage.css`: Styles for the homepage.
  - `ReactCSSDesign.css`: Styles for the React + CSS design page.
  - `ChakraUIDesign.css`: Styles for the Chakra UI design page.

## Design Selection

Once you open the app, you will see two buttons:

- **React + CSS**: Select this option to view the React + CSS design.
- **Chakra UI**: Select this option to view the Chakra UI-based design.

Each design offers a distinct user interface, with **React + CSS** using traditional CSS and **Chakra UI** utilizing the Chakra UI component library for a modern look and feel.

## Chakra UI

Chakra UI is a simple, modular, and accessible component library that provides building blocks to create React applications with ease. It simplifies the development process and offers a consistent, beautiful, and responsive design.

- [Chakra UI Documentation](https://chakra-ui.com/docs/getting-started)

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. We welcome contributions from the community!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

# README for Saline Electron App

## About Saline

Saline is an Electron application designed for inserting information into templates. It's a versatile tool developed by Landan Wrightsman, aiming to enhance productivity and streamline workflows.

## Building from Source

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (preferably the latest stable version)
- Yarn or npm (Yarn is recommended for consistency with existing scripts)

### Steps to Build

1. **Clone the Repository**
   - Use Git to clone the repository to your local machine:
     ```bash
     git clone <https://github.com/LandanW/saline>
     ```

2. **Navigate to the Project Directory**
   - Change to the project directory:
     ```bash
     cd saline
     ```

3. **Install Dependencies**
   - Run the following command to install the necessary dependencies:
     ```bash
     yarn install
     ```

4. **Build the Application**
   - Use the provided script to build the app:
     ```bash
     yarn electron:build
     ```

   This command will create a production build of the app and package it using Electron Builder.

### Running the App Locally

To run the app in a development environment:
- Use the `electron:serve` script:
  ```bash
  yarn electron:serve

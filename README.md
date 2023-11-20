# Saline

## About Saline

Saline is an open source Electron application that aims to streamline the document creation process for repetitive tasks such as Invoices.

## Building from Source

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 
- Yarn or npm 

### Steps to Build

1. **Clone the Repository**
   - Use Git to clone the repository to your local machine:
     ```bash
     git clone https://github.com/LandanW/saline
     ```

2. **Navigate to the Project Directory**
   - Change to the project directory:
     ```bash
     cd saline
     ```

3. **Install Dependencies**
   - Install the necessary dependencies:
     ```bash
     yarn install
     ```

4. **Build the Application**
   - Build the app:
     ```bash
     yarn electron:build
     ```

   This command will create a production build of the app and package it using Electron Builder.

### Running the App Locally

To run the app in a development environment:
- Use the `electron:serve` script:
  ```bash
  yarn electron:serve

# 🌟 ZipURL

ZipURL is a high-performance, scalable URL shortener built with Java Spring Boot for the backend and Next.js for the frontend. With ZipURL, you can effortlessly generate short links, track clicks, and manage URLs.

## 📜 Features

- **Instant URL Shortening**: Convert long URLs into concise, manageable links.
- **Custom length**: Choose the length of the short link (for auto generated only).
- **Custom Aliases**: Create personalized short links.
- **Analytics Dashboard**: Monitor clicks and other metrics.
- **Password Protection**: Secure short links with passwords.
- **Expiration Dates**: Set expiration dates for temporary links.
- **Click Limits**: Set the number of clicks after which the link will expire.
- **Edit and Delete Links**: Modify or remove short links as needed.
- **QR Codes**: Generate QR codes for short links.

## 🛠️ Tech Stack

### 🌐 Frontend
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for making API requests.
- **JS Cookie**: A secure, lightweight JavaScript library for handling cookies.
- **React Datepicker**: A simple and reusable datepicker component for React.

### ⚙️ Backend
- **Java Spring Boot**: A framework for building production-ready applications in Java.
- **Maven**: A build automation tool for Java projects.
- **Lombok**: A library to reduce boilerplate code in Java.
- **JWT**: A standard for creating tokens.
- **Java-dotenv**: A Java library for reading environment variables.
- **Spring Data JPA**: A data access framework for Java applications.
- **Commons-Validator**: A library for validating Emails.

### 📊 Database
- **MySQL**: A reliable, high-performance relational database management system.

### ➕ DevOps
- **Docker**: A platform for developing, shipping, and running applications in containers.

## 🚀 Getting Started

### Prerequisites
- **Node.js** and **npm**
- **Docker** (for containerization)

### Installation
***Note:*** *You need to create a .env file in the root directory of the project ( / )  **AND** in the server directory ( /server )*

*The .env files should contain the following variables (change with your credentials)*

   ```dotenv
   #Change <database_name> with your database name  (should be the same as the one in DB_NAME)
   DB_URL=jdbc:mysql://codewarsdb:3306/<database_name>
   #Has to be root
   DB_USERNAME=root
   #Change with your password
   DB_PASSWORD=root
   #Change <database_name> with your database name should be the same as the one in DB_URL
   DB_NAME=<database_name>
   #Change with your secret
   JWT_SECRET=secret
   ```
***Note:*** *Ports 3000 (client) and `8080` (server) and `3307` (database is usually on 3306 you should have any problem) need to be free (not used by other program)*

***Note:*** *You need to have *docker* and *Node.js* installed on your machine*



> [!IMPORTANT]
> - ***Note:*** *You need to have *docker* and *Node.js* installed on your machine*
> - ***Note:*** *Ports 3000 (client) and `8080` (server) and `3307` (database is usually on 3306 you should have any problem) need to be free (not used by other program)*
> - *The .env files should contain the following variables (change with your credentials)*
> - ***Note:*** *You need to create a .env file in the root directory of the project ( / )  **AND** in the server directory ( /server )*

1. **Clone the repository**:
    ```sh
    git clone https://github.com/ITPG-CODEWARS/codewars-2024-second-round-Maximus019BG.git
    cd codewars-2024-second-round-Maximus019BG
    ```

2. **Backend and Database Setup**:
    - Navigate to the backend directory:
        ```sh
        cd server
        ```
    - Build the docker compose:
        ```sh
        docker compose up --build
        ```
    - wait for the build to finish (it takes a while) and you are done with the backend setup
   

3. **Frontend Setup**:
    - **Open new terminal** and *navigate* to the frontend directory:
        ```sh
        cd client
        ```
    - Install dependencies:
        ```sh
        npm install
        ```
      or
        ```sh
        npm i
        ```
    - Build the Next.js application:
        ```sh
        npm run build
        ```
    - Start the frontend server:
        ```sh
        npm run start
        ```

## 📈 Usage
1. **Access the Application**:
    - Open your browser and navigate to `http://localhost:3000` for the frontend.
    - The backend API will be available at `http://localhost:8080`.


2. **Shorten a URL**:
    - Use the frontend interface to input a long URL and generate a short link.
    - You can also create a custom alias for the short link.
    - Set an expiration date for temporary links.
    - Set the number of clicks after which the link will expire.
    - And Other


3. **Monitor Link Performance**:
    - Access the analytics dashboard to monitor the performance of your short links.
      - Track the number of clicks.
      - View the date of creation.
      - Check the expiration date.
      - View the number of clicks
      - Edit the link
         - Change the expiration date
         - Change the password
         - Change the number of clicks after which the link will expire
         - Change the alias
      - Delete the link
   

## 🤝❌ Contributing
We **DO NOT** accept contributions at this time.
Its olympiad project after all.

## 📧 Contact
For any inquiries or feedback, please contact us at [maksimralev27@itpg-varna.bg](mailto:maksimralev27@itpg-varna.bg).
---

Thank you for using ZipURL! We hope it makes your URL management easier and more efficient.

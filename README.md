# 🚀 ZipURL

ZipURL is a high-performance, scalable URL shortener built with Java Spring Boot for the backend and Next.js for the frontend. With ZipURL, you can effortlessly generate short links, track clicks, and manage URLs.

## 📜 Features

- **Instant URL Shortening**: Convert long URLs into concise, manageable links.
- **Custom Aliases**: Create personalized short links.
- **Analytics Dashboard**: Monitor clicks and other metrics.
- **Expiration Dates**: Set expiration dates for temporary links.

## 🛠️ Tech Stack

### Frontend
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend
- **Java Spring Boot**: A framework for building production-ready applications in Java.
- **Maven**: A build automation tool for Java projects.
- **Lombok**: A library to reduce boilerplate code in Java.
- **JWT**: A standard for creating access tokens.
- **Spring Data JPA**: A data access framework for Java applications.

### Database
- **MySQL**: A reliable, high-performance relational database management system.

### Others
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **Nginx**: A high-performance web server and reverse proxy.

## 🚀 Getting Started

### Prerequisites
- **Java 11** or higher
- **Node.js** and **npm**
- **Docker** (for containerization)
- **MySQL** (for database)

### Installation
***Note:*** *You need to create a .env file in the root directory of the project*

*The .env file should contain the following variables (change with your credentials)*
   ```dotenv
   DB_URL=jdbc:mysql://localhost:3306/database
   DB_USERNAME=root
   DB_PASSWORD=root
   JWT_SECRET=secret
   ```

1. **Clone the repository**:
    ```sh
    git clone https://github.com/ITPG-CODEWARS/codewars-2024-second-round-Maximus019BG.git
    cd codewars-2024-second-round-Maximus019BG.git
    ```

2. **Backend Setup**:
    - Navigate to the backend directory:
        ```sh
        cd server
        ```
    - Build the docker compose:
        ```sh
         docker-compose up --build
        ```
      or
        ```sh
        docker compose up --build
        ```


3. **Frontend Setup**:
    - Navigate to the frontend directory:
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

4. **Database Setup**:
    - MySQL is set with docker


## 📈 Usage

1. **Access the Application**:
    - Open your browser and navigate to `http://localhost:3000` for the frontend.
    - The backend API will be available at `http://localhost:8080`.

2. **Shorten a URL**:
    - Use the frontend interface to input a long URL and generate a short link.

3. **Track Clicks**:
    - Access the analytics dashboard to monitor the performance of your short links.

## 🤝 Contributing
We DO NOT accept contributions at this time.
Its olympiad project after all.

## 📧 Contact

For any inquiries or feedback, please contact us at [maksimralev27@itpg-varna.bg](mailto:maksimralev27@itpg-varna.bg).

---

Thank you for using ZipURL! We hope it makes your URL management easier and more efficient.
<h1 align="center">SEA Salon Management System</h1>

![GitHub last commit](https://img.shields.io/github/last-commit/ChaiGans/sea-salon)

# Description
SEA Salon is a web application designed to facilitate online reservations between customers and SEA Salon. The platform allows administrators to manage salon branches without hardcoding, and enables customers to make service reservations online, thus eliminating the need to wait in line at the salon and making the waiting process virtual.

# Tech Stack
The following technologies are used in the development of the SEA Salon website:
- **Next.js** - A React framework for production.
- **TailwindCSS** - A utility-first CSS framework for rapid UI development.
- **Aiven** - Cloud database service for hosting the PostgreSQL database.
- **PostgreSQL** - Open-source relational database.
- **Prisma ORM** - Object-relational mapping tool to facilitate database interactions.
- **NextAuth.js** - Authentication library for Next.js applications.

# Credentials
To interact with the SEA Salon system, use the following credentials:

### Admin Access
- **Email:** thomas.n@compfest.id
- **Password:** Admin123

### Customer Access
- **Email:** Akunbaru@gmail.com
- **Password:** Akunbaru

### Create New Account
- Users can register their own accounts via the website. Note that new admin accounts can only be added by manually inserting records into the database.

# Environment Setup
To run the SEA Salon locally or in your own deployment, configure your environment variables as follows:
```shell
DATABASE_URL="postgres://avnadmin:AVNS_ugbFwXAOdod2iXQ9NWI@sea-salon-sea-salon-01.g.aivencloud.com:27793/defaultdb?sslmode=require"
NEXTAUTH_SECRET=ZT9WC79g4OFkXy590UJ67IZ7eNd17djRH+R5rHve8KE="
```

# Accessing the Deployed Application
The SEA Salon is deployed and accessible at: [SEA Salon Website](https://sea-salon-n75z-qrrig5khw-chaigans-projects.vercel.app/), hosted on Vercel.

# Installation 
Follow these steps:
1. Clone this repository :

```shell
git clone https://github.com/ChaiGans/sea-salon.git
```

2. Navigate to the src directory of the program by running the following command in the terminal:

```shell
cd sea-salon
```

3. Install the required packages:
```shell
npm install
```

4. Set up your Prisma database:
```shell
npx prisma migrate dev
```
5. Start the development server:
```shell
npm run dev
```
The application should now be running at http://localhost:3000.

# Adding an Admin User
To add an admin user to the system:
1. Access the database using your preferred PostgreSQL client.
2. Insert a new record into the users table with the role set to 'admin'. Ensure the password is securely hashed (e.g., using bcrypt).

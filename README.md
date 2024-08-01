# PayPro
![PayPro](https://github.com/Ploynpk/paypro/blob/1e561e91a105d31c3c1d6689198c18aae4f397f6/src/client/img/logo3.png?raw=true)

> PayPro is a financial management web application specifically designed to manage and track shared expenses, a task that can often be tedious and complex when handled manually. In many social contexts—whether among roommates, friends, or within families—financial transactions involving shared costs can lead to misunderstandings or imbalances that may strain relationships. PayPro simplifies this process by providing a clear, intuitive platform for recording, monitoring, and settling shared expenses in an equitable manner.


## Core Features

- **User Authentication**: Secure login and registration system to ensure that financial data is accessible only to authorized users.
- **Expense Logging**: Add and track every shared expense with details about who paid and who owes, ensuring everyone is on the same page.
- **Automated Calculations**: The system automatically calculates how much each member owes or is owed, facilitating easy and fair settlements.


## Stretch Goals
- **Notifications**: Automatic reminders for outstanding payments, ensuring that all debts are settled on time.
- **Group Dashboards**: Users can create and manage multiple groups, each with its own unique dashboard for monitoring shared financial activities.


## Technologies Used

- **Frontend**: React.js for a dynamic and responsive user interface.
- **Backend**: Node.js and Express.js to handle API requests and server-side logic.
- **Database**: MongoDB for storing user data and transaction records efficiently.
- **Authentication**: Use bcrypt for secure password hashing. JWT (JSON Web Tokens) setup is in progress for scalable user authentication, but it is not functional yet.
- **Styling**: Utilize CSS and modern UI frameworks like Material-UI for a clean and user-friendly design.

## How to get started

- copy this url to your terminal then 'git clone' this repository
```
https://github.com/Ploynpk/paypro.git
 ```
1. npm install 
2. npm start
 - If you also want to be able to see your server terminal 
   - cd server -> nodemon server.js

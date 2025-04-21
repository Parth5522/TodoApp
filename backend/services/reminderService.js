import nodemailer from 'nodemailer';
import { Todo } from "../models/todoSchema.js";
import cron from "node-cron";
import { User } from "../models/userSchema.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

const sendReminderEmails = async () => {
  try {
    // Query database for todos with reminder times matching the current time
    const currentTime = new Date();
    const todos = await Todo.find({ 
        rdate: {
            $gte: new Date(currentTime.getTime() - 1000), // 1 minute before current time
            $lte: new Date(currentTime.getTime() + 1000)  // 1 minute after current time
        } 
    });

    // Iterate over matching todos and send reminder emails
    await Promise.all(todos.map(async (todo) => {
        const user = await User.findById(todo.postedBy);
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Reminder: Your Todo',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Todo Reminder</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #666;
                    }
                    .quote {
                        font-style: italic;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Todo Reminder</h1>
                    <p>Dear User,</p>
                    <p>Here's a gentle reminder to complete your todo:</p>
                    <h3>${todo.title}</h3>
                    <p>Description: ${todo.description}</p>
                    <p>Remember, every accomplishment starts with the decision to try. Stay motivated and keep working towards your goals!</p>
                    <p class="quote">"The secret of getting ahead is getting started." - Mark Twain</p>
                    <p>Best regards,</p>
                    <p>Your Todo Reminder Service</p>
                </div>
            </body>
            </html>
            `,
            // You can customize the email content as needed
        };
        await transporter.sendMail(mailOptions);
    }));
  } catch (error) {
    console.error('Error sending reminder emails:', error);
  }
};

const startReminderService = () => {
    // Schedule the job to run every minute
    cron.schedule('* * * * *', () => {
      sendReminderEmails();
    });
};

export default { startReminderService };

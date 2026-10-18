import mysql from "mysql2"
import fs from "fs"
import "dotenv/config";

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
    ca: fs.readFileSync("./ca.pem"),
    rejectUnauthorized: true
}
})


function registerUser(userData) {
    return new Promise((resolve, reject) => {
        const { name, email, password } = userData
        const sql = "insert into users(name,email,password)values(?,?,?)"
        con.query(sql, [name, email, password], (err, result) => {
            if (err) {
                return reject(err.message);
            }
            resolve(result.insertId)
        })
    })
}

function getUsersData() {
    return new Promise((resolve, reject) => {
        const sql = "select * from users";
        con.query(sql, (err, result) => {
            if (err) return reject(err.message);
            resolve(result);
        })
    })
}

function addContact(contactData, userId) {
    return new Promise((resolve, reject) => {
        const { name, phone, address, city, category } = contactData
        const sql = "insert into contacts (user_id,name,phone,address,city,category)values(?,?,?,?,?,?)"

        con.query(sql, [userId, name, phone, address, city, category], (err, result) => {

            if (err) {
                return reject(err.message)
            }
            resolve(result.insertId)
        })
    })
}

function deleteContact(contactId, userId) {

    return new Promise((resolve, reject) => {

        const sql = "delete from contacts where id=? and user_id=?"
        con.query(sql, [contactId, userId], (err, result) => {
            if (err) return reject(err.message);
            resolve(result);
        })
    })

}

function updateContact(contactData, contactid, userId) {
    return new Promise((resolve, reject) => {
        const { name, phone, address, city, category } = contactData;
        const fields = [];
        const values = [];

        if (name !== undefined) {
            fields.push("name = ?");
            values.push(name);
        }
        if (phone !== undefined) {
            fields.push("phone = ?");
            values.push(phone);
        }
        if (city !== undefined) {
            fields.push("city = ?");
            values.push(city);
        }
        if (address !== undefined) {
            fields.push("address = ?");
            values.push(address);
        }
        if (category !== undefined) {
            fields.push("category = ?");
            values.push(category);
        }
        if (contactid === undefined) {
            return reject("id required");
        }

        // Agar koi field update karne ke liye nahi di gayi
        if (fields.length === 0) {
            return reject("No fields to update");
        }

        const sql = `update contacts set ${fields.join(", ")} WHERE id = ? AND user_id = ?`;

        values.push(contactid);
        values.push(userId);

        con.query(sql, values, (err, result) => {
            if (err) return reject(err.message);
            resolve(result);
        });
    });
}

function getContactsData(userId) {

    return new Promise((resolve, reject) => {

        const sql = "select * from contacts where user_id=?";

        con.query(sql, [userId], (err, result) => {

            if (err) return reject(err.message);
            resolve(result)

        })

    })

}


export {
    registerUser,
    addContact,
    deleteContact,
    updateContact,
    getContactsData,
    getUsersData
}
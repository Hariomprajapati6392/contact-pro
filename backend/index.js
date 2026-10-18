import express, { json } from "express";
import { addContact, deleteContact, getContactsData, getUsersData, registerUser, updateContact } from "./database/mydb.js"
import { checkPassword, passwordHash } from "./passwordHashing.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import "dotenv/config";
const app = express();

app.use(cors({
    origin: "https://hariomprajapati6392.github.io",
    credentials: true,
}))

app.use(express.urlencoded({ extended: true }));
app.use(json())
app.use(cookieParser())



app.post("/api/users/register", async (req, res) => {
    try {
        const userData = req.body
        const hashPass = await passwordHash(userData.password)
        userData.password = hashPass;

        const userId = await registerUser(userData);


        res.cookie("userInfo", JSON.stringify({
            name: userData.name,
            userId: userId
        }
        ),
            {
                httpOnly: true,
                    sameSite: "none",
                    secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            })

        return res.status(201).json({
            message: "user registered successfully",

        })
    } catch (err) {
        return res.status(500).json({ error: `registation failed ${err}` })
    }
})


app.post("/api/users/login", async (req, res) => {

    const { email, password } = req.body;
    const result = await getUsersData()
    const user = result.find((u) => u.email === email)
    if (!user) {
        return res.status(400).json({
            error: "User is not registered. Please register first.",
            success: false
        })
    };

    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'password not matched!' });
    }
    res.cookie(
        "userInfo",
        JSON.stringify({
            name: user.name,
            userId: user.id,
        }),
        {
            httpOnly: true,
                sameSite: "none",
                secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        }
    );
    return res.status(200).json({
        messageL: 'Logged in successfully!',
        success: true,
    })
})


app.get("/api/users/me", (req, res) => {
    const cookieData = req.cookies?.userInfo;

    if (!cookieData) {
        return res.status(401).json({
            message: "Please login first",
        });
    }
    const userInfo = JSON.parse(cookieData)
    return res.json({ name: userInfo.name })
})

function authMiddleware(req, res, next) {
    try {
        const cookieData = req.cookies?.userInfo;

        if (!cookieData) {
            return res.status(401).json({
                message: "Please login first",
            });
        }

        const userInfo = JSON.parse(cookieData);

        if (!userInfo.userId) {
            return res.status(401).json({
                message: "Invalid user information",
            });
        }

        req.userId = userInfo.userId;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid cookie",
        });
    }
}

app.get("/api/contacts", authMiddleware,async (req, res) => {
    try {
        const userId = req.userId;
        const result = await getContactsData(userId) 
        return res.json({
            results: result
        })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


app.post("/api/contacts/add",authMiddleware, async (req, res) => {

    try {
        const userId = req.userId

        const contactData = req.body
        await addContact(contactData, userId);
        return res.status(201).json({
            message: "contact added sucessfully",
        })
    } catch (err) {
        return res.status(500).json({ message: `contact not added ${err}` })
    }
})


app.delete("/api/contacts/delete/:id",authMiddleware,async (req, res) => {

    try {
        const userId = req.userId
        const Id = Number(req.params.id)

        await deleteContact(Id, userId);

        return res.json({ message: "contact deleted sucessfully" })
    } catch (err) {
        return res.json({ error: err })
    }
})


app.put("/api/contacts/update/:id",authMiddleware,async (req, res) => {

    try {
        const userId = req.userId
        const contactId = Number(req.params.id)
        const contactData = req.body
        await updateContact(contactData, contactId, userId)
        return res.json({ message: "data updated sucessfully!", success: true })
    } catch (err) {
        return res.status(500).json({ error: err })
    }

})



app.get("/api/users/logout",(req, res) => {

    const cookieData = req.cookies?.userInfo;

    if (!cookieData) {
        return res.status(401).json({
            message: "Please login first",
        });
    }
    res.clearCookie("userInfo")
    
    return res.status(200).json({
        message: "Logout successful",
    });
})

const PORT = process.env.PORT || 3000

app.listen(PORT)


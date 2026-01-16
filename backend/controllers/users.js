import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function addUser(req, res) {
  try {
    const { name, email, username, password } = req.body;

    //  Required fields check
    if (!name || !email || !username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //  Email format validation
const emailRegex = /^[^\s@]{3,}@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Username format validation
    const usernameRegex = /^[a-z0-9_]{4,}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must be at least 4 characters and contain only lowercase letters, numbers, and _",
      });
    }

    //  Duplicate email check
    const emailExists = await Users.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    //  Duplicate username check
    const usernameExists = await Users.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save clean user
    const newUser = new Users({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const userToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "User logged in successfully " });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const data = await Users.find({});
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const data = await Users.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ message: "No data found with the request" });
    }

    if (req.user.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedUser = await Users.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({
      message: "User Updated",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await Users.findByIdAndDelete(id);
    return res.status(200).json({ message: "User Deleted", user: deletedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function authCheck(req, res) {
  return res.status(200).json({
    authenticated: true,
    user: req.user,
  });
}

export function logout(req, res) {
  res.cookie("userToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logged out successfully" });
}

export async function checkUserExists(req, res) {
  try {
    const { field, value } = req.query;

    // allow only safe fields
    const allowedFields = ["email", "username"];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field" });
    }

    if (!value) {
      return res.status(400).json({ message: "Value is required" });
    }

    const exists = await Users.exists({ [field]: value });

    return res.status(200).json({
      exists: Boolean(exists),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

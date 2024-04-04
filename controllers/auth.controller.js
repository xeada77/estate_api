import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE NEW USER AND SAVE USER TO DB

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatar,
      },
    });

    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user!" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });
    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid Credentials!" });
    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    //res.setHeader("Set-Cookie", "test=" + "cookiedeprueba");
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    const { password: Userpassword, ...userInfo } = user;
    console.log(userInfo);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: age,
      origin: "localhost",
      //secure: true
    });
    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to get Users!" });
  }
};
export const getUser = async (req, res) => {
  const id = req.params.userId;
  const tokenId = req.tokenUserId;

  if (id !== tokenId) return res.status(403).json({ message: "Not Allowed!" });
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get User!" });
  }
};
export const updateUser = async (req, res) => {
  const id = req.params.userId;
  const tokenId = req.tokenUserId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenId) return res.status(403).json({ message: "Not Allowed!" });

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: updateUserPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ message: "Failed to update User!" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.userId;
  const tokenId = req.tokenUserId;

  if (id !== tokenId) return res.status(403).json({ message: "Not Allowed!" });

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: `User ${id} deleted!` });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete User" });
  }
};

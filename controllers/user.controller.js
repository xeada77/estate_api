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
  //const id = req.params.userId;
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

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.tokenUserId;

  console.log(postId);
  console.log(userId);

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post remove from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId,
          postId,
        },
      });
      res.status(200).json({ message: "Post saved in saved list" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went Wrong!" });
  }
};

export const getProfilePosts = async (req, res) => {
  const tokenId = req.tokenUserId;
  //console.log(tokenId);

  //if (id !== tokenId) return res.status(403).json({ message: "Not Allowed!" });
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((savedPost) => {
      savedPost.post.isSaved = true;
      return savedPost.post;
    });
    //console.log(userPosts);
    res.status(200).json({
      data: { userPosts, savedPosts },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get Profile Posts!" });
  }
};

import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const verifySaved = async (req, res, next) => {
  const token = req.cookies.token;
  const postId = req.params.postId;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) return (req.body.isSaved = false);

      const saved = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            postId,
            userId: payload.id,
          },
        },
      });
      req.body.isSaved = saved ? true : false;

      //console.log(req.body.isSaved);
    });
  }

  next();
};

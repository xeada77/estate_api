import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const verifySaved = async (req, res, next) => {
  const token = req.cookies.token;
  const postId = req.params.postId;
  req.isSaved = false;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) return (req.body.isSaved = false);
      //console.log(payload);
      //console.log(postId);
      const saved = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            postId,
            userId: payload.id,
          },
        },
      });
      console.log(saved);
      req.isSaved = saved ? true : false;

      //console.log(req.isSaved);
    });
  } else {
    req.isSaved = false;
  }

  next();
};

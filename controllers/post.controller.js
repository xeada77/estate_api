import prisma from "../lib/prisma.js";

export const getPost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json({
      data: post,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went Wrong!" });
  }
};
export const getPosts = async (req, res) => {
  const query = req.query;
  //console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: query.userId || undefined,
        type: query.type || undefined,
        city: query.city || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        bathroom: parseInt(query.bathroom) || undefined,
        property: query.property || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        },
      },
    });
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(500).json({ message: "Something went Wrong!" });
  }
};
export const createPost = async (req, res) => {
  const tokenId = req.tokenUserId;
  //console.log(req.body);

  try {
    const newPost = await prisma.post.create({
      data: {
        ...req.body.postData,
        userId: tokenId,
        postDetail: {
          create: req.body.postDetail,
        },
      },
    });

    res.status(200).json({
      message: "Post created successfully!",
      data: newPost,
    });
  } catch (err) {
    //console.log(err);
    res.status(500).json({ message: "Something went Wrong!" });
  }
};
export const updatePost = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "Something went Wrong!" });
  }
};
export const deletePost = async (req, res) => {
  const tokenUserId = req.tokenUserId;
  const postId = req.params.postId;
  console.log(postId);

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Allowed!" });
    }

    await prisma.post.delete({ where: { id: postId } });
    return res
      .status(200)
      .json({ message: `Post ${post.id} deleted successfully!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went Wrong!" });
  }
};

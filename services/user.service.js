import prisma from "../db/client.js";
import bcrypt from "bcryptjs";

const service = {
  createUser: async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(user);
    const createdUser = await prisma.user.create({
      data: {
        fullname: user.fullname,
        username: user.username,
        password: hashedPassword,
        // creates home folder for user
        folders: {
          create: {
            name: "home",
          },
        },
      },
      include: {
        folders: true,
      },
    });
    return createdUser;
  },
};
export default service;

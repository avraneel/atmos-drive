import prisma from "../db/client.js";
import bcrypt from "bcryptjs";
import supabase from "../db/supabase.client.js";

const service = {
  createUser: async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
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
    console.log(user.username);
    return createdUser;
  },
};
export default service;

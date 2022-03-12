import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const cookies = getCookie('accessToken',{ req, res });
    console.log(cookies);
    return res.json(cookies);
    // const { email, password } = req.body;
    // if (!email || !password) {
    //   return res.status(400).json({
    //     message: "Please fill all the fields",
    //   });
    // }

    // try {
    //   // Check if user exists
    //   const user = await prismaClient.user.findUnique({
    //     where: {
    //       email,
    //     },
    //   });
    //   if (!hasUser) {
    //     return res.json({
    //       success: false,
    //       message: "User not found",
    //     });
    //   }
    //   // Compare password
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (!isMatch) {
    //     return res.json({
    //       success: false,
    //       message: "Incorrect credentials",
    //     });
    //   }

    //   res.json({
    //     success: true,
    //     message: "User signin successfully",
    //   });
    // } catch (err) {
    //   console.log(err.message);
    //   res.json({
    //     success: false,
    //     message: err.message,
    //   });
    // }
  }
}

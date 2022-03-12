import { getCookie, removeCookies } from "cookies-next";
import { removeToken } from "../../../helpers/helpers";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {id} = req.body;
    const { refreshToken } = getCookie("refreshToken", { req, res });
    // delete refresh token from db
    await removeToken(id,refreshToken);
    // delete cookies
    removeCookies("refreshToken", { req, res });
    removeCookies("accessToken", { req, res });
    res.json({ user: null, isAuth: false });
  }
}

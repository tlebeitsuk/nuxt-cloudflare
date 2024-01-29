import { generateState } from "arctic"
import { github } from "@/server/utils/auth"

export default defineEventHandler(async (event) => {
  const state = generateState()
  const url = await github.createAuthorizationURL(state)

  setCookie(event, "github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  return sendRedirect(event, url.toString())
})

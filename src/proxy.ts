import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Ignora rotas internas, a API e arquivos com extensão (imagens, favicon etc.).
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

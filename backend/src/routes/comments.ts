import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import{ verify} from "hono/jwt";

export const commentRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	}
    Variables: {
        userId: string
    }
}>();

commentRouter.use('/*', async (c, next) => {
    const hheader = c.req.header("Authorization") || "";
    const token = hheader.split(" ")[0];
  try{
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      const ID = String(response.id);
      c.set("userId", ID);
      await next();
    } else {
      c.status(403);
      return c.json({ error: 'unauthorized' });
    }
  }catch(error){
    c.status(403);
    return c.json({ error: 'unauthorized' });
  }
  });


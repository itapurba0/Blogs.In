import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from "hono/jwt";
import { createCommentInput } from "../../../common/src/index";
import { cors } from 'hono/cors';

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
    const token = hheader.split(" ")[0]; // Extract the token correctly
    try {
        const response = await verify(token, c.env.JWT_SECRET);
        if (response.id) {
            const ID = String(response.id);
            c.set("userId", ID);
            await next();
        } else {
            c.status(403);
            return c.json({ error: 'unauthorized' });
        }
    } catch (error) {
        c.status(403);
        return c.json({ error: 'unauthorized' });
    }
});

commentRouter.post('/comment', async (c) => {
    const body = await c.req.json();
    const { success } = createCommentInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ messege: 'Invalid inputs types' });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const comment = await prisma.comment.create({
        data: {
            content: body.content,
            post: {
                connect: {
                    id: body.postId
                }
            },
            author: {
                connect: {
                    id: c.get("userId")
                }
            }
        }
    });
    return c.json({
        id: comment.id
    });
});

commentRouter.get('/all/:id', async (c) => {
    const idd = c.req.param("id");
    console.log(idd);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const comments = await prisma.comment.findMany({
        where: {
            postId: Number(idd)
        },
        select: {
            id: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return c.json({
        comments
    });
});

commentRouter.delete('/delete/:postId', async (c) => {
    const id = c.req.param("postId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const comment = await prisma.comment.delete({
        where: {
            id: id
        }
    });
    return c.json({
        id: comment.id
    });
});



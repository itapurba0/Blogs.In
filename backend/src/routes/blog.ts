import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import{ verify} from "hono/jwt";
import { createPostInput, updatePostInput, publishPostInput } from "@arkoroy/common-auth/dist";
export const blogRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	}
    Variables: {
        userId: string
    }
}>();
blogRouter.use('/*', async (c, next) => {
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
  
  blogRouter.post('/post', async (c) => {
    const authorId = c.get("userId");
    const body = await c.req.json();
    //console.log(body);
    const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({messege: 'Invalid inputs types'});
	}
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: authorId
      }
    });
    return c.json({
      id: blog.id
    });
  });

blogRouter.put('/blog', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({messege: 'Invalid inputs types'});
    }
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
    const blog =await prisma.post.update({
        where: {
            id : body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
	return c.json({
        id: blog.id})
})

blogRouter.put('/publish', async (c) => {
  const body = await c.req.json();
  console.log(body);
  const { success, error } = publishPostInput.safeParse(body);
  console.log(success);
  if (!success) {
    console.log('Validation error:', error);
    console.log('Body:', body);
    c.status(411);
    return c.json({messege: 'Invalid inputs types'});
  }
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
  const blog =await prisma.post.update({
      where: {
          id : body.id
      },
      data: {
          published: body.published
      }
  })
return c.json({
      id: blog.id})
})

blogRouter.get('/one/:id', async(c) => {
	const id = await c.req.param("id");
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  try{
    const blog =await prisma.post.findUnique({
        where: {
            id : Number(id)
        },
        select: {
          id: true,
          title: true,
          content: true,
          publishDate: true,
          author: {
            select:{
            name: true
            }
          }
        }
    })
	    return c.json({
        blog
    })
    }catch(error){
         c.status(411);
         return c.json({
        message: "error while fetching data"})
    }
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
      select:{
        id: true,
        title: true,
        content: true,
        published: true,
        publishDate: true,
        author: {
          select:{
          name: true
          }
        }
      }
    });
	return c.json({
        blogs
    })
})
blogRouter.get('/my', async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const authorId = c.get("userId");
    const blogs = await prisma.post.findMany({
      where: {
        authorId: authorId
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        publishDate: true,
        author: {
          select:{
          name: true,
          aboutMe: true,
          bio: true
          }
      }
    }
    });
  return c.json({
        blogs
    })
})
blogRouter.delete('/delete/:id', async (c) => {
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const blog =await prisma.post.delete({
        where: {
            id : Number(id)
        }
    })
  return c.json({
        id: blog.id
    })
})
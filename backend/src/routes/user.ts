import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from "hono/jwt";
import { signupInput, signinInput } from  "@arkoroy/common-auth/dist";
import { verify } from "hono/jwt";
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
		jwt: string
	}
	variables: {
		id: string,
		userID: string
	}
	
}>();

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
    const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({messege: 'Invalid inputs types'});
	}
  try {
	const user =await prisma.user.create({
		data: {
            name: body.name,
			email: body.email,
			password: body.password,
		},
	})
	const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
	return c.json({jwt: jwt});
     } catch (error) {
       console.log(error);
       c.status(411);
       return c.text('Invalid');
     }

})
userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({messege: 'Inputs are not correct'});
	}
  try{
	const user = await prisma.user.findFirst({
		where: {
			email: body.email,
            password: body.password
		},
	})
	if (!user) {
		c.status(403);
		return c.json({error : 'invalid email or password'});
	}
   const jwt = await sign({id: user.id}, c.env.JWT_SECRET);

	return c.json({jwt});
   }catch(error){
    console.log(error);
    c.status(411);
    return c.text('Invalid');
   }
})
userRouter.put('/updateAbout', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	const hheader = c.req.header("Authorization") || "";
	const token = hheader.split(" ")[0];
	try{
		const user = await verify(token, c.env.JWT_SECRET);
		if (user.id) {
			const ID = String(user.id);
			await prisma.user.update({
				where: {
					id: ID
				},
				data: {
					name: body.name,
					aboutMe: body.aboutMe,
					bio: body.bio
				}
			})	
			return c.json({
				aboutMe: body.aboutMe,
				bio: body.bio
			})
		} else {
			c.status(403);
			return c.json({ error: 'unauthorized' });
		}
	}catch(error){
		console.log(error);
		c.status(411);
		return c.text('Invalid');	
	}
})



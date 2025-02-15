import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { commentRouter } from './routes/comments';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	}
}>();
app.use('/*',cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
app.route('/api/v1/comments', commentRouter);
export default app

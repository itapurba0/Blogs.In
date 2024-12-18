import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
  author?: {
    name: string;
  };
  title: string;
  content: string;
  id: number;
  published: boolean;
  publishDate: string;
}

export interface User{
  name: string,
  email: string,
  aboutMe: string,
  bio: string
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/one/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        setBlog(response.data.blog);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { loading, blog };
};

export const useMyBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/my`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, blogs };
};

export const useBlogs = (): {loading: boolean; blogs: Blog[]} => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return { loading, blogs };
};

export const useHandlePublish = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async (id: number) => {
    setLoading(true);
    try {
      const payload = { id, published: true };
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog/publish`,
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.status === 200) {
        alert("Blog published successfully");
        navigate(`/blog/one/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePublish };
};

export const useHandleDelete = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        }
      });
      if (response.status === 200) {
        alert("Blog deleted successfully");
        navigate(`/MyBlogs`, { replace: true });
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDelete };
};
export const usePublish = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Publish = async (title: string, content: string,published: boolean) => {
    setLoading(true);
    try {
      const payload = { title, content,published };
      console.log(payload);
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog/post`, payload, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        alert("Blog published successfully");
        navigate(`/blog/one/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
    } finally {
      setLoading(false);
    }    
};
return { loading, Publish };
}

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(); 

  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/getUser`,
            {
              headers: {
                Authorization: localStorage.getItem("jwt"),
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
  }, []);
  return { loading, user };
}

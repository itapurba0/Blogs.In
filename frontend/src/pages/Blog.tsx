import {  FullBlog} from "../components/export";
import { useBlog } from "../hooks/Index";
import { useParams } from "react-router-dom";
export const Blog = () => {
    const {id} = useParams();
    const {loading , blog} = useBlog({id: id || ""});
    
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#C7B8EA] to-[#A0A8E7]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }
    return (
        <div>
            <div className="">
                <div className=" w-screen">
                 { blog && <FullBlog blog={blog}/>}
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar } from "../components/AppBar";
import { usePublish } from "../hooks/Index";
import { BACKEND_URL, SAPLING_API_KEY } from "../config";
import {Sapling }from '@saplingai/sapling-js/observer';

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const titleInputRef = useRef(null);
  const quillRef = useRef(null);
  useEffect(() => {
    Sapling.init({
      key: SAPLING_API_KEY,
      endpointHostname: 'https://api.sapling.ai',
      editPathname: '/api/v1/edits',
      statusBadge: true,
      mode: 'dev',
    });

    const editor = document.querySelector('.ql-editor') as HTMLElement;
    if (editor) {
      Sapling.observe(editor);
    }
  }, []);

  const publish = usePublish();
  const save = async () => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog/post`, { title, content, published: false }, {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      }
    });
    if (response.status === 200) {
      alert("Blog saved successfully");
      navigate(`/MyBlogs`);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C7B8EA] to-[#8B6EA9] flex flex-col items-center">
      <AppBar />
      <div className="pt-24 pb-10 px-6 md:px-10 lg:px-28 w-full max-w-4xl">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg space-y-6">
          <input
            ref={titleInputRef}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="text-4xl font-light text-gray-700 focus:outline-none w-full p-2 rounded-md bg-white bg-opacity-30"
          />
          <div className='h-[400px] bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg'>
          <ReactQuill
            value={content}
            onChange={(e) => setContent(e)}
            placeholder="Start writing here..."
            style={{ height: '300px' }}
            ref={quillRef}
          />
          </div>
          <div className='flex justify-center space-x-8'>
          <button
            onClick={() => {
              save();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-full"
          >
            Save
          </button>
          <button
            onClick={() => {
              publish.Publish(title, content, true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-full"
          >
            Publish
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

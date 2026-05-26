import { useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar } from "../components/AppBar";
import { usePublish } from "../hooks/Index";
import { BACKEND_URL } from "../config";
//import {Sapling }from '@saplingai/sapling-js/observer';

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const titleInputRef = useRef(null);
  // TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({ placeholder: 'Start writing here...' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }: { editor: any }) => setContent(editor.getHTML()),
  });
  // useEffect(() => {
  //   Sapling.init({
  //     key: SAPLING_API_KEY,
  //     endpointHostname: 'https://api.sapling.ai',
  //     editPathname: '/api/v1/edits',
  //     statusBadge: true,
  //     mode: 'dev',
  //   });

  //   const editor = document.querySelector('.ql-editor') as HTMLElement;
  //   if (editor) {
  //     Sapling.observe(editor);
  //   }
  // }, []);

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
          <div className='border border-white/10 rounded-lg p-2 bg-[rgba(255,255,255,0.03)]'>
            <div className='flex gap-2 mb-2 flex-wrap'>
              <button type='button' onClick={() => editor?.chain().focus().toggleBold().run()} className='px-2 py-1 bg-white/5 rounded'>B</button>
              <button type='button' onClick={() => editor?.chain().focus().toggleItalic().run()} className='px-2 py-1 bg-white/5 rounded'>I</button>
              <button type='button' onClick={() => editor?.chain().focus().toggleUnderline().run()} className='px-2 py-1 bg-white/5 rounded'>U</button>
              <button type='button' onClick={() => editor?.chain().focus().toggleStrike().run()} className='px-2 py-1 bg-white/5 rounded'>S</button>
              <button type='button' onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className='px-2 py-1 bg-white/5 rounded'>H1</button>
              <button type='button' onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className='px-2 py-1 bg-white/5 rounded'>H2</button>
              <button type='button' onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className='px-2 py-1 bg-white/5 rounded'>H3</button>
              <button type='button' onClick={() => editor?.chain().focus().setParagraph().run()} className='px-2 py-1 bg-white/5 rounded'>P</button>
              <button type='button' onClick={() => editor?.chain().focus().toggleBulletList().run()} className='px-2 py-1 bg-white/5 rounded'>• List</button>
              <button type='button' onClick={() => editor?.chain().focus().toggleOrderedList().run()} className='px-2 py-1 bg-white/5 rounded'>1. List</button>
              <button type='button' onClick={() => {
                const url = prompt('Image URL');
                if (url) editor?.chain().focus().setImage({ src: url }).run();
              }} className='px-2 py-1 bg-white/5 rounded'>Image</button>
              <button type='button' onClick={() => {
                const url = prompt('Link URL');
                if (url) editor?.chain().focus().setLink({ href: url }).run();
              }} className='px-2 py-1 bg-white/5 rounded'>Link</button>
              <button type='button' onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()} className='px-2 py-1 bg-red-600/20 rounded'>Clear</button>
            </div>

            <div className='min-h-[300px] prose prose-invert max-w-none'>
              <EditorContent editor={editor} className='ql-editor p-4 bg-transparent outline-none' />
            </div>
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
                publish.Publish(title, (editor ? editor.getHTML() : content), true);
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

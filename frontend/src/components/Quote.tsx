import axios from 'axios';
import { useEffect, useState } from 'react';
export const Quote = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);

  const fetchQuote = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/quotes/random');
            setQuote(response.data.quote);
            setAuthor(response.data.author);
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(() => {
        fetchQuote(); 
        const intervalId = setInterval(fetchQuote, 4000); 
        return () => clearInterval(intervalId); 
      }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#C7B8EA] to-[#8B6EA9]">
      <div className="relative bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-3xl p-8 w-full max-w-lg">
        <div className="text-center">
          {quote && (
            <h1 className="text-4xl font-bold text-[#6E4A8B] drop-shadow-lg">
              "{quote}"
            </h1>
          )}

          {author && (
            <p className="mt-4 text-lg font-semibold text-[#6E4A8B] drop-shadow-lg">
              - {author}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
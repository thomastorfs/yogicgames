import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating, setRating }: { rating: number, setRating?: (r: number) => void }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button 
          key={star} 
          onClick={() => setRating && setRating(star)} 
          className={`${setRating ? 'cursor-pointer hover:scale-110 transition' : 'cursor-default'}`}
          disabled={!setRating}
        >
          <Star 
            size={setRating ? 24 : 16} 
            className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
          />
        </button>
      ))}
    </div>
  );
};
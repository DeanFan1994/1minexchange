import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  avatar: string;
  name: string;
  title: string;
  comment: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  onSelect?: (index: number) => void;
}

export default function Testimonials({ testimonials, onSelect }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          onClick={() => onSelect && onSelect(index)}
          className="bg-[#003366] rounded-lg p-6 shadow-lg hover:shadow-xl transition cursor-pointer h-full"
          onClick={() => onSelect && onSelect(index)}
        >
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-[#FFD700]">
                {testimonial.name}
              </h3>
              <p className="text-[#FFD700] text-sm">
                {typeof testimonial.title === 'string' ? testimonial.title : testimonial.title.en}
              </p>
              <div className="flex justify-center md:justify-start my-2">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i}
                    className={`fa-solid fa-star ${i < testimonial.rating ? 'text-[#FFD700]' : 'text-gray-500'}`}
                  ></i>
                ))}
              </div>
              <p className="mt-2">"{typeof testimonial.comment === 'string' ? testimonial.comment : testimonial.comment.en}"</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
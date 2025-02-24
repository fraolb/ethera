"use client";

const categories = [
  {
    id: 1,
    title: "Entertainment",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Music",
    image:
      "https://images.unsplash.com/photo-1548918901-9b31223c5c3a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Photography",
    image:
      "https://images.unsplash.com/photo-1503656142023-618e7d1f435a?q=80&w=1589&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Art",
    image:
      "https://images.unsplash.com/photo-1727412189152-fee1a5b9f5a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Fiction",
    image:
      "https://images.unsplash.com/photo-1515104882246-521e5ba18f5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

interface Category {
  id: number;
  title: string;
  image: string;
}

const CategoryCard = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

const Category = ({ category }: { category: Category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:cursor-pointer">
      <div className="relative">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-20 object-cover"
        />

        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
          {category.title}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;

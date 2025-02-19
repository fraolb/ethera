interface Content {
  title: string;
  description: string;
  image: string;
  views: number;
}

interface ContentCardProps {
  cardTitle: string;
  contents: Content[];
}

const Promote: React.FC<ContentCardProps> = ({ cardTitle, contents }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xs">
      <h3 className="text-xl font-semibold text-gray-800 p-4 pb-2">
        {cardTitle}
      </h3>

      <div className="space-y-1 p-4 pt-2">
        {contents.map((content, index) => (
          <div
            key={index}
            className="flex border border-solid rounded-md h-16 gap-4 shadow-md hover:shadow-2xl hover:cursor-pointer"
          >
            {/* Image with rounded left edge */}
            <img
              src={content.image}
              alt={content.title}
              className="w-20 h-16 object-cover rounded-l-md" // Add rounded-l-md here
            />
            <div className="flex-1 min-w-0">
              {/* Title - Single line with ellipsis */}
              <h4 className="text-lg font-semibold text-gray-700 truncate">
                {content.title}
              </h4>
              {/* Description - Single line with ellipsis */}
              <p className="text-gray-500 text-sm truncate">
                {content.description}
              </p>
              {/* Views - Single line */}
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span className="truncate">{content.views} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promote;

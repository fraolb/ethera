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
      <h3 className="text-xl font-semibold text-gray-800 p-4">{cardTitle}</h3>

      <div className="space-y-4 p-4">
        {contents.map((content, index) => (
          <div key={index} className="flex gap-4">
            <img
              src={content.image}
              alt={content.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-700">
                {content.title}
              </h4>
              <p className="text-gray-500 text-sm mt-1">
                {content.description}
              </p>
              <div className="flex justify-between items-center mt-2 text-gray-400 text-xs">
                <span>{content.views} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promote;

const CreatorProfile = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-md mb-4">
      <div className="flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">Johnathan Clein</h2>
          <p className="text-gray-500">
            Commercial Photographer | California, USA
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <p>
          <strong>3487</strong> Subscribers
        </p>
        <p>
          <strong>28</strong> Posts
        </p>
        <p>
          <strong>1593</strong> Likes
        </p>
      </div>
    </div>
  );
};

export default CreatorProfile;

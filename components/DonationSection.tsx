const DonationSection = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden w-full max-w-xs">
      <h3 className="font-bold mb-2">Donate</h3>
      <input
        type="number"
        className="w-full border p-2 mb-2"
        placeholder="Amount"
      />
      <input
        type="text"
        className="w-full border p-2 mb-2"
        placeholder="Your name"
      />
      <input
        type="text"
        className="w-full border p-2 mb-2"
        placeholder="Add message"
      />
      <button className="bg-orange-500 text-white w-full py-2 rounded-md">
        Donate
      </button>
    </div>
  );
};

export default DonationSection;

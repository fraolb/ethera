const SubscriptionTiers = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden w-full max-w-xs">
      <h3 className="font-bold mb-4 ">Subscription Tiers</h3>

      <SubscriptionPlan
        title="Basic"
        price={4}
        benefits={["Access to premium posts", "One free course"]}
        subscribed
      />
      <SubscriptionPlan
        title="Advanced"
        price={8}
        benefits={["Access to premium posts", "All free courses"]}
      />
    </div>
  );
};

const SubscriptionPlan = ({
  title,
  price,
  benefits,
  subscribed,
}: {
  title: string;
  price: number;
  benefits: string[];
  subscribed?: boolean;
}) => (
  <div className="border p-4 mb-2 rounded-md">
    <h4 className="font-bold">
      {title} - ${price}/month
    </h4>
    <ul className="text-sm text-gray-600">
      {benefits.map((b, i) => (
        <li key={i}>- {b}</li>
      ))}
    </ul>
    {subscribed ? (
      <p className="text-green-500 font-bold mt-2">You are subscribed</p>
    ) : (
      <button className="bg-orange-500 text-white w-full py-2 rounded-md mt-2">
        Subscribe
      </button>
    )}
  </div>
);

export default SubscriptionTiers;

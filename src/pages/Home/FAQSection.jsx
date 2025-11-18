import React from 'react';

const FAQSection = () => {
  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="space-y-4">
        {/* FAQ 1 */}
        <div className="collapse collapse-plus bg-base-100 border border-gray-200 rounded-lg">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            What is your delivery time?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              Most deliveries arrive within 24–48 hours depending on your
              location.
            </p>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="collapse collapse-plus bg-base-100 border border-gray-200 rounded-lg">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            Do you offer refunds?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              Yes, refunds are available within 7 days of delivery with proper
              reason.
            </p>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="collapse collapse-plus bg-base-100 border border-gray-200 rounded-lg">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            How can I track my parcel?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              You can easily track your parcel from the dashboard using the
              tracking ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

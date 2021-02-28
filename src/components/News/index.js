import React from "react";
import "./styles.scss";

function index() {
  return (
    <div className="news">
      <h2> Our News</h2>
      <div className="p-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <div className="rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="data:image/jpeg;base64,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"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Mountain</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="https://us.123rf.com/450wm/seventyfour74/seventyfour741903/seventyfour74190301094/119554076-kids-painting-sun-above-view.jpg?ver=6"
            alt="River"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">River</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>

        <div className="rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="data:image/jpeg;base64,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"
            alt="Forest"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Forest</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;

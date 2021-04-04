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
            src="https://media.afar.com/uploads/images/afar_posts/images/UMSyWPWwKA/original_open-uri20190522-27192-7s45x5?1558541146"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              - Online Tour - Coming Soon{" "}
            </div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg">
          <img
            className="w-full h-50"
            src="https://us.123rf.com/450wm/seventyfour74/seventyfour741903/seventyfour74190301094/119554076-kids-painting-sun-above-view.jpg?ver=6"
            alt="River"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              "Painting With Kids" - Coming Soon
            </div>
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
            src="https://dscreative.co.uk/wp-content/uploads/2019/10/Canvas-Prints-Custom-design-mockup.jpg"
            alt="Forest"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Custom Print Coming Soon....
            </div>
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

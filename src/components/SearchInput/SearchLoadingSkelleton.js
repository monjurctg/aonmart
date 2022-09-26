import React from "react";
import Skeleton from "react-loading-skeleton";

const SearchLoadingSkelleton = ({ loading }) => {
  const total = [1, 2];
  return (
    <>
      {loading && (
        <div className="search-suggestion-area o-2">
          {total.map((item) => (
            <div className="row" key={item}>
              <div className="col-2">
                <div className="ml-3">
                  <Skeleton height={60} width={40} />
                </div>
              </div>
              <div className="col-10">
                <p>
                  <Skeleton count={2} />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchLoadingSkelleton;

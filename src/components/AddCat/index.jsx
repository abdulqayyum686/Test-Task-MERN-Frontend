import React from "react";

const AddCat = () => {
  return (
    <>
      <div className="home_container">
        <div>
          <div>Add category</div>
          <div className="add_cat">
            <input placeholder="add category" className="input_ele" />
          </div>
          <div className="cat_submit">Submit</div>
        </div>
      </div>
    </>
  );
};

export default AddCat;

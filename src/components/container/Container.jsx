import React from 'react';
import CardPost from '../card-posts/CardPost';
import CardFilter from '../card-filter/CardFilter';
import filters from '../../data/filter';

const Container = ({step, posts, like, image, setFilter, handleCaption}) => {
  return (
    <>
      <h1>Container</h1>
      <h2>You are in step {step}</h2>
      {step ===1  && posts.map((post, index) => <CardPost key={index} post={post} like={like}/>)}
      {step === 2 &&
        <>
        <div className="selected-image">
          <img src={image} alt=""/>
        </div>
        <div className="filter-container">
          {filters.map(
            (filter, index) => 
              (<CardFilter
                filter={filter}
                image={image}
                key={index}
                setFilter={setFilter}
               />))}
        </div>
        </>
      }
      {step === 3 &&
      <>
        <div className="selected-image">
          <img src={image} alt=""/>
        </div>
        <div className="caption-container">
          <textarea 
            className="caption-input"
            type="text"
            placeholder="Write a caption..."
            onChange={(ev) => handleCaption(ev.target.value)}
          ></textarea>
        </div>
        </>
      }
    </>
  );
};

export default Container;
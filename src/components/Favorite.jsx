import React, { useState } from 'react';
import { Badge, Button, Modal } from 'antd';
import NewsItem from './NewsItem';
import { useSelector } from 'react-redux';

const Favorite = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const liked = useSelector(state => state.favorites)


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // get grid class based on number of liked news
  const getGridClass = () => {
    if (liked?.length >= 3) {
      return 'md:grid-cols-3 xl:grid-cols-4';
    } else if (liked?.length === 2) {
      return 'md:grid-cols-2';
    } else {
      return 'md:grid-cols-1';
    }
  }
  return (
    <>
      <Badge count={liked?.length}  >
        <Button type="primary" onClick={showModal}>
          Favorite
        </Button>
      </Badge>
      <Modal
        title="Favorites News"
        centered
        width={liked?.length >= 3 ? 1200 : 600}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={`grid gap-10 sm:grid-cols-2 pt-3 ${getGridClass()}`}>
          {
            liked?.length > 0
              ? liked?.map((item, index) => (
                <NewsItem key={index} data={item} />
              ))
              : <p className='text-center'>No Liked News</p>
          }
        </div>
      </Modal>
    </>
  );
};
export default React.memo(Favorite)
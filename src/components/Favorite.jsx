import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import NewsItem from './NewsItem';

const Favorite = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const liked = JSON.parse(localStorage.getItem('liked')) || []
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getGridClass = () => {
    if (liked.length >= 3) {
      return 'md:grid-cols-3 xl:grid-cols-4';
    } else if (liked.length === 2) {
      return 'md:grid-cols-2';
    } else {
      return 'md:grid-cols-1';
    }
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Favorite
      </Button>
      <Modal
        title="Favorites News"
        centered
        width={liked.length >= 3 ? 1200 : 600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={`grid gap-10 sm:grid-cols-2 pt-3 ${getGridClass()}`}>

          {
            liked.length > 0
              ? liked.map((item, index) => {
                return (
                  <NewsItem key={index} data={item} />
                )
              })
              : <p className='text-center'>No Liked News</p>
          }
        </div>


      </Modal>
    </>
  );
};
export default Favorite
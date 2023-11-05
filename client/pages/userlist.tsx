import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import styles from '../styles/UserList.module.css'; // Import the module

// ...rest of your code remains unchanged...
interface DataType {
    gender?: string;
    name: {
      title?: string;
      first?: string;
      last?: string;
    };
    email?: string;
    picture: {
      large?: string;
      medium?: string;
      thumbnail?: string;
    };
    nat?: string;
    loading: boolean;
  }
  
  const count = 3;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const UserList: React.FC = () => {
  // ...rest of your useState and useEffect hooks...
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };
  // Your load more button with scoped styles from the module
  const loadMore =
    !initLoading && !loading ? (
      <div className={styles.loadMoreButton}>
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  // Use the scoped `list` class for the List component
  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item className={styles.listItem} actions={[
          <a key="list-loadmore-edit" className={styles.actionLink}>edit</a>, 
          <a key="list-loadmore-more" className={styles.actionLink}>more</a>
        ]}>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar className={styles.avatar} src={item.picture.large} />}
              title={<a href="https://ant.design" className={styles.titleLink}>{item.name?.last}</a>}
              description={<div className={styles.description}>Ant Design, a design language for background applications, is refined by Ant UED Team</div>}
            />
            <div className={styles.content}>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );  
};

export default UserList;

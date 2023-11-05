import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, List, Space } from 'antd';


const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App: React.FC = () => (
<div style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // This centers the list vertically in the container
  minHeight: '100vh', // This makes the container take up at least the full viewport height
  backgroundColor: '#f0f2f5', // Sets a background color for the entire page (or container)
  alignItems: 'center', // This centers the content horizontally
}}>
  <h1 style={{
    margin: '0 0 20px 0', // Adds space below the heading
    fontSize: '2rem', // Sets the size of the heading text
    color: '#1890ff', // Sets the color of the heading text
  }}>
    Your List Title Here
  </h1>
  <div style={{
    padding: '20px',
    maxWidth: '800px',
    width: '100%', // This ensures that the div does not exceed the width of its parent
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px', // Adds some space below the list
  }}>
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
        size: 'small',
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          style={{
            paddingLeft: '20px',
          }}
        >
          <List.Item.Meta
            title={<a href={item.href} style={{ fontSize: '1.2em', fontWeight: '500', color: '#1890ff' }}>{item.title}</a>}
            description={<div style={{ marginBottom: '0.5em' }}>{item.description}</div>}
          />
          <div style={{ marginTop: '10px' }}>{item.content}</div>
        </List.Item>
      )}
    />
  </div>
</div>

);


export default App;
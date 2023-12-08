import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

export const Loader: React.FC = () => {
  return (
    <ContentLoader
      viewBox="0 0 380 70"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      speed={2}
      width="100%"
      height={68}
      style={{ marginBottom: 20 }}
    >
      <Rect x="0" y="30" rx="2" ry="2" width="100%" height="80%" />
    </ContentLoader>
  );
};

import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { Text, View } from 'react-native';

export function HistoryRowLoader() {
  return (
    <ContentLoader
      speed={2}
      width={320}
      height={68}
      viewBox="0 0 320 68"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Rect x="60" y="19" rx="2" ry="2" width="130" height="12" />
      <Rect x="60" y="40" rx="2" ry="2" width="84" height="10" />
      <Circle cx="22" cy="34" r="22" />
    </ContentLoader>
  );
}

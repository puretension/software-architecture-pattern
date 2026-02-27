'use client';

import EmotionRegistry from './EmotionRegistry';

/**
 * 전역 레이아웃
 * @param {{ children: React.ReactNode }} props 
 */
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}

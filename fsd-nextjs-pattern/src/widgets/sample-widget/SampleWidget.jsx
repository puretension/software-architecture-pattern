'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { sampleRepo } from '@/domains/sample/sample.repository';
import { increaseNumber, decreaseNumber } from '@/features/sample/sample.action.feature';
import { useIsNumberOverFive } from '@/features/sample/sample.useIsNumberOverFive.feature';

/**
 * 기능들을 묶어서 보여주는 재사용 가능한 샘플 위젯
 * 컴포넌트 내부 배치 순서(08-component-ordering.md)를 따릅니다.
 * @author (작성자)
 */
export function SampleWidget() {
  // 1. 기본 훅
  const [clickCount, setClickCount] = useState(0);

  // 2. 전역 상태 (zustand repo 활용)
  const numberState = sampleRepo.useStates((state) => state.numberState);

  // 3. 지역 상태 (context 등 - 여기서는 생략)

  // 4. 유도된 상태 / 커스텀 훅
  const isNumberOverFive = useIsNumberOverFive();

  // 5. 이벤트 핸들러 및 상호작용 함수
  function handleIncreaseClick() {
    setClickCount((prev) => prev + 1);
    increaseNumber();
  }

  function handleDecreaseClick() {
    setClickCount((prev) => prev + 1);
    decreaseNumber();
  }

  // 6. side effects (useEffect)
  useEffect(() => {
    console.log(`현재 clickCount: ${clickCount}, 전역 카운터: ${numberState}`);
  }, [clickCount, numberState]);

  // 7. 랜더링
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center', width: '100%', maxWidth: 400 }}>
      {/* 상태값 렌더링 */}
      <Typography variant="h4" color="primary" gutterBottom>
        Counter: {numberState}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        {/* 비즈니스 로직을 사용한 상태값 조작 */}
        <Button variant="contained" color="success" onClick={handleIncreaseClick}>
          증가 (+)
        </Button>
        <Button variant="contained" color="error" onClick={handleDecreaseClick}>
          감소 (-)
        </Button>
      </Stack>

      <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
        {/* 상태값으로부터 도출된 값 렌더링 */}
        <Typography variant="body1" color="text.secondary">
          5 초과 여부: {isNumberOverFive ? '✅ 예' : '❌ 아니오'}
        </Typography>
        <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
          로컬 클릭 횟수: {clickCount}
        </Typography>
      </Box>
    </Paper>
  );
}

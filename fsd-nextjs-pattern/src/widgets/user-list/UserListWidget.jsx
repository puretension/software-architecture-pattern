'use client';

import { useLoadUsers } from '@/features/user/user.useLoadUsers.feature';
import { formatUserName } from '@/domains/user/util/user.util';
import { Box, Card, CardContent, Typography, CircularProgress, Chip } from '@mui/material';

export default function UserListWidget() {
  const { users, loading, error } = useLoadUsers();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>Users</Typography>
      {users.map(user => (
        <Card key={user.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{formatUserName(user)}</Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Chip label={user.role} size="small" sx={{ mt: 1 }} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

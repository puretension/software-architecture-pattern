'use client';

import { useState } from 'react';
import { useCreateUser } from '@/features/user/user.useCreateUser.feature';
import { USER_ROLES } from '@/domains/user/schema/user.schema';
import { Box, Card, CardContent, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';

export default function CreateUserWidget() {
  const [formData, setFormData] = useState({ name: '', email: '', role: USER_ROLES.USER });
  const { createNewUser, loading, error } = useCreateUser();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await createNewUser(formData);
      setFormData({ name: '', email: '', role: USER_ROLES.USER });
      setSuccess(true);
    } catch (err) {
      // error는 hook에서 관리
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>Create New User</Typography>
        
        {success && <Alert severity="success" sx={{ mb: 2 }}>User created successfully!</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            margin="normal"
          >
            {Object.values(USER_ROLES).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

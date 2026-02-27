'use client';

import { Container, Box, Grid, Typography } from '@mui/material';
import UserListWidget from '@/widgets/user-list/UserListWidget';
import CreateUserWidget from '@/widgets/create-user/CreateUserWidget';
import ProductListWidget from '@/widgets/product-list/ProductListWidget';
import CartWidget from '@/widgets/cart/CartWidget';

/**
 * Main page
 * - Display user list, product list, and cart widgets
 * @author (author)
 */
export default function Page() {
  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Typography variant="h3" mb={1} fontWeight="bold">
          FSD Next.js Reference
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Production-scale domain structure example
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box mb={4}>
              <ProductListWidget />
            </Box>
            <UserListWidget />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb={3}>
              <CartWidget />
            </Box>
            <CreateUserWidget />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

'use client';

import { useLoadProducts } from '@/features/product/product.useLoadProducts.feature';
import { useAddToCart } from '@/features/product/product.useAddToCart.feature';
import { formatPrice, getProductStockStatus } from '@/domains/product/util/product.util';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Chip, Grid } from '@mui/material';

export default function ProductListWidget() {
  const { products, loading, error } = useLoadProducts();
  const { addToCart } = useAddToCart();

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
      <Typography variant="h5" mb={2}>Products</Typography>
      <Grid container spacing={2}>
        {products.map(product => {
          const stockStatus = getProductStockStatus(product.stock);
          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary" mb={1}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" mb={1}>
                    {formatPrice(product.price)}
                  </Typography>
                  <Box display="flex" gap={1} mb={2}>
                    <Chip label={product.category} size="small" />
                    <Chip 
                      label={`Stock: ${product.stock}`} 
                      size="small"
                      color={stockStatus === 'out-of-stock' ? 'error' : stockStatus === 'low-stock' ? 'warning' : 'success'}
                    />
                  </Box>
                  <Button 
                    variant="contained" 
                    fullWidth
                    disabled={stockStatus === 'out-of-stock'}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

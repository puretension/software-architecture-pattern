'use client';

import { useRemoveFromCart } from '@/features/product/product.useRemoveFromCart.feature';
import { useClearCart } from '@/features/product/product.useClearCart.feature';
import { formatPrice, calculateCartTotal } from '@/domains/product/util/product.util';
import { Box, Card, CardContent, Typography, Button, List, ListItem, IconButton } from '@mui/material';

export default function CartWidget() {
  const { cart, removeFromCart } = useRemoveFromCart();
  const { clearCart } = useClearCart();

  const total = calculateCartTotal(cart);

  if (cart.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Shopping Cart</Typography>
          <Typography color="text.secondary">Your cart is empty</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>Shopping Cart ({cart.length})</Typography>
        <List>
          {cart.map(item => (
            <ListItem 
              key={item.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                  ✕
                </IconButton>
              }
            >
              <Box flex={1}>
                <Typography>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatPrice(item.price)} × {item.quantity}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        <Box mt={2} pt={2} borderTop={1} borderColor="divider">
          <Typography variant="h6" mb={2}>
            Total: {formatPrice(total)}
          </Typography>
          <Box display="flex" gap={1}>
            <Button variant="contained" fullWidth>
              Checkout
            </Button>
            <Button variant="outlined" onClick={clearCart}>
              Clear
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

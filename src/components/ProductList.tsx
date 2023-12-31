import { Box, Card, CardContent, CardMedia, CircularProgress, Rating, Stack, TextField, Typography } from "@mui/material";
import { useSupabase } from "../hooks/useSupabase";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function ProductList() {
    const supabase = useSupabase();

    const { data, isLoading } = useQuery("products", async () => {
        const { data } = await supabase.from("products").select("*, reviews(count)");
        return data;
    });

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </div>
        );
    }
    
    if (!data) {
        return <div>Erreur lors du chargement des produits.</div>;
    }

    return (
        <Stack spacing={4}>
            <Typography variant='h6' textAlign='center'>
                Liste de produits
            </Typography>
            <Box sx={{ mx: '1em', mt: '1em' }}>
                <TextField fullWidth label='Rechercher...' />
            </Box>
            {data.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
                    <Card sx={{ display: 'flex', textDecoration: 'none' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 100, borderRadius: '16px 0 0 16px' }}
                            image={product.image}
                            alt={product.name}
                        />
                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 0 }}>
                            <Stack direction="column">
                                <Typography variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.price} €
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Rating name="product-rating" size="small" value={2} readOnly />
                                <Typography variant="body2" color="text.secondary">
                                    {product.reviews[0].count} avis
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </Stack>
    );
}
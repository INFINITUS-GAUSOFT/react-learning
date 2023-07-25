import { useParams } from "react-router-dom";

import { useSupabase } from "../hooks/useSupabase";
import { Alert, Box, Button, CircularProgress, Paper, Rating, Stack, TextareaAutosize, Typography, styled } from "@mui/material";
import { Product, Review, CreateReview } from "../types";
import { useMutation, useQuery } from "react-query";
import dayjs from 'dayjs';
import { useState } from "react";

const StyledTextarea = styled(TextareaAutosize)(
    () => `
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        // firefox
        &:focus-visible {
            outline: 0;
        }
    `,
);


export default function ProductDetails() {
    const { id } = useParams();
    const supabase = useSupabase();

    const [comment, setComment] = useState("");
    const [note, setNote] = useState<number | null>(0);

    const { data: product, isLoading } = useQuery("product", fetchProduct);

    const { mutate, isLoading: isSavingReview } = useMutation(async (data: CreateReview) => {
        const { data: response, error } = await supabase.from("reviews").insert(data);

        if (error) {
            console.error(error);
        } else {
            window.location.reload();
            console.log("Review inserted successfully:", response);
        }
    });

    async function fetchProduct() {
        const { data: product } = await supabase.from("products").select(`*, reviews(id, note, comment, created_at)`)
            .eq("id", id)
            .limit(1)
            .single<Product>();

        return product;
    }

    async function handleSubmit() {
        if (note && comment) {

            if (!id) throw new Error("Product not found");

            const reviewData: CreateReview = {
                product_id: Number.parseInt(id),
                comment,
                note,
            };

            mutate(reviewData);
        }
    }

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <Box sx={{ py: '2em' }}>
            <Stack direction="row" spacing={4}>
                <img src={product?.image} alt={product?.name} width={200} />
                <Stack direction="column">
                    <h1>{product?.name}</h1>
                    <p>{product?.price} €</p>
                    <p>{product?.description}</p>
                </Stack>
            </Stack>
            <Stack direction="column" spacing={2}>
                <h4>Avis des clients</h4>
                {
                    product?.reviews.map((review: Review) => (
                        <Paper key={review.id} sx={{ mb: 2, padding: 2 }} elevation={1}>
                            <Stack direction="column" spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Rating name="product-rating" value={review.note} readOnly />
                                    <Typography variant="body2" color="text.secondary">{dayjs(review.created_at).format("DD/MM/YYYY HH:mm")}</Typography>
                                </Stack>
                                <Alert icon={false} sx={{ backgroundColor: "#f0f0f0", color: "#333" }}>{review.comment}</Alert>
                            </Stack>
                        </Paper>
                    ))
                }
            </Stack>
            <h4>Ajouter un avis</h4>
            <Stack direction="column" spacing={2}>
                <Rating name="product-rating" precision={0.5} value={note} onChange={(event, value) => setNote(value)} />
                <StyledTextarea
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Ecrivez votre avis"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <Button variant="contained" disabled={(!comment || !note) && isSavingReview} onClick={handleSubmit}>Envoyer</Button>
            </Stack>
        </Box>
    )
}
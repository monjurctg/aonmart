export function productImageUrl(imageFileName) {
    return `${process.env.NEXT_PUBLIC_URL}images/products/${imageFileName}`;
}
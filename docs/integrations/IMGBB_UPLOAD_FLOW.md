# ImgBB Image Upload Client Integration

1. Client selects JPEG/PNG file.
2. File is previewed immediately via `URL.createObjectURL`.
3. Sent as `multipart/form-data` to `/api/uploads/image`.
4. Server uploads securely to ImgBB and returns permanent HTTPS image URL.
5. Image URL is saved with treatment or guest profile.

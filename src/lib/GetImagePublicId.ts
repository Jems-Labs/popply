export function getPublicIdFromUrl(imageUrl: string): string | null {
  if (!imageUrl) return null;

  const parts = imageUrl.split("/");
  const uploadIndex = parts.indexOf("upload");

  if (uploadIndex === -1) return null;

  const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");
  return publicIdWithExtension.split(".")[0]; // Remove file extension
}

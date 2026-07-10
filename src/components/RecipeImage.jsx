import { useEffect, useRef, useState } from "react";
import { getImage } from "../lib/imageDB";

export default function RecipeImage({ imageId, alt, className, fallbackSrc }) {
  const [imageUrl, setImageUrl] = useState(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    // Revoke previous blob immediately
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (!imageId) {
      setImageUrl(null);
      return;
    }

    let cancelled = false;

    getImage(imageId)
      .then((file) => {
        if (cancelled) return;
        if (!file) {
          setImageUrl(null);
          return;
        }
        const objectUrl = URL.createObjectURL(file);
        objectUrlRef.current = objectUrl;
        setImageUrl(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setImageUrl(null);
      });

    return () => {
      cancelled = true;
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [imageId]);

  const src = imageUrl || fallbackSrc;
  if (!src) return null;

  return <img alt={alt} className={className} src={src} />;
}

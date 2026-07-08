import { useEffect, useState } from "react";
import { getImage } from "./db";

export default function RecipeImage({ imageId, alt, className }) {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		if (!imageId) {
			setImageUrl(null);
			return;
		}

		let objectUrl;
		let cancelled = false;

		getImage(imageId).then((file) => {
			if (file && !cancelled) {
				objectUrl = URL.createObjectURL(file);
				setImageUrl(objectUrl);
			}
		});

		return () => {
			cancelled = true;
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [imageId]);

	if (!imageUrl) return null;

	return <img src={imageUrl} alt={alt} className={className} />;
}

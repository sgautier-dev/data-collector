import Image from "next/image";

type ResponsiveImageProps = {
	src: string;
	originalWidth: number;
	originalHeight: number;
	width: number;
	alt: string;
	priority?: boolean;
}

export default function ResponsiveImage({
	src,
	originalWidth,
	originalHeight,
	width,
	alt,
	priority = false,
}: ResponsiveImageProps) {
	const aspectRatio = originalHeight / originalWidth;
	const height = width * aspectRatio;

	return (
		<Image
			src={src}
			width={width}
			height={height}
			alt={alt}
			priority={priority}
		/>
	);
}

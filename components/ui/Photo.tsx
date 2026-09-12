import Image from "next/image";

type Props = {
  photo: { src: string; alt: string };
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Real photography, replacing the abstract ArtPanel where verified,
 * free-to-use imagery is available (see lib/stockPhotos.ts).
 */
export default function Photo({ photo, className = "", priority = false, sizes = "(min-width: 1024px) 50vw, 100vw" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

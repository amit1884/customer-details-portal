import { useEffect, useState } from "react";
import "./image-container.css";
import Spinner from "../Spinner/Spinner";

const ImageConatiner: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fetchImages = async () => {
    try {
      setLoading(true);
      const imageUrls: any = await Promise.all(
        Array.from({ length: 9 }, () =>
          fetch("https://picsum.photos/200").then((res) => res.url)
        )
      );
      setLoading(false);
      setError("");
      setImages(imageUrls);
    } catch (error) {
      setLoading(false);
      setError("Error fetching images");
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
    const interval = setInterval(() => {
      fetchImages();
    }, 10000); // Change images every 10 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="photos-container">
      {loading && !error && (
        <div className="flex-center">
          <Spinner />
        </div>
      )}
      {images?.length > 0 &&
        images.map((url, idx) => (
          <div className="thumbnail" key={idx}>
            <img src={url} alt={` ${idx + 1}`} />
          </div>
        ))}
      {error && !loading && (
        <div className="flex-center">
          <p className="error-txt">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ImageConatiner;

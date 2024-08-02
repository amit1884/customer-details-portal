import { useEffect, useState } from "react";
import "./image-container.css";
import Spinner from "../Spinner/Spinner";
interface dataItem {
  data: any;
}

const ImageConatiner: React.FC<dataItem> = ({ data }) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const fetchImages = async () => {
    try {
      const imageUrls: any = await Promise.all(
        Array.from({ length: 9 }, () =>
          fetch("https://picsum.photos/200").then((res) => res.url)
        )
      );
      setError("");
      setImages(imageUrls);
    } catch (error) {
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
  useEffect(() => {
    setImages([]);
    fetchImages();
  }, [data]);
  if (images.length === 0) {
    return (
      <div className="flex-center">
        <Spinner />
      </div>
    );
  } else
    return (
      <div className="photos-container">
        {images?.length > 0 &&
          images.map((url, idx) => (
            <div className="thumbnail" key={idx}>
              <img src={url} alt={` ${idx + 1}`} />
            </div>
          ))}
        {error && (
          <div className="flex-center">
            <p className="error-txt">{error}</p>
          </div>
        )}
      </div>
    );
};

export default ImageConatiner;

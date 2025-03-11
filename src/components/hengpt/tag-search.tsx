"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { sample } from "lodash";
import { useAnimatedText } from "./hooks/useAnimatedText";
import { useHengpt } from "./contexts";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded border bg-white p-4 shadow">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const mockApiCall = async (description: string) => {
  return new Promise<{
    products: { name: string; price: string; image: string }[];
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        products: [
          {
            name: "Product 1",
            price: "$20",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Product 2",
            price: "$30",
            image: "https://via.placeholder.com/150",
          },
          {
            name: "Product 3",
            price: "$40",
            image: "https://via.placeholder.com/150",
          },
        ],
      });
    }, 1000);
  });
};

const recommendedDescriptions = [
  "Stylish running shoes for daily workouts",
  "Wireless noise-canceling headphones",
  "Ergonomic office chair with lumbar support",
  "Smartphone with high-resolution camera",
  "Lightweight laptop for remote work",
];

const TagSearch = () => {
  const [description, setDescription] = useState("");
  const [submittedDescription, setSubmittedDescription] = useState<
    string | null
  >(null);
  const [searchResult, setSearchResult] = useState<{
    tags: string[];
    suggestedTags: string[];
    explaination: string;
  } | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState<
    string | null
  >(sample(recommendedDescriptions)!);
  const explaination = useAnimatedText(searchResult?.explaination || "");
  const { setTags } = useHengpt();

  useEffect(() => {
    if (description) return;
    const interval = setInterval(() => {
      setCurrentRecommendation(recommendedDescriptions[0]);
      setTimeout(() => setCurrentRecommendation(null), 5000);
    }, 6000);

    return () => clearInterval(interval);
  }, [description]);

  const handleSubmit = async () => {
    setSubmittedDescription(description);
    setLoading(true);
    await mockApiCall(description);
    setSearchResult({
      tags: ["shoes", "running", "stylish"],
      suggestedTags: ["workout", "jogging", "athletic"],
      explaination: "These products are recommended based on your description.",
    });
    setTags([
      { value: "shoes", included: true },
      { value: "running", included: true },
      { value: "stylish", included: true },
    ]);
    setLoading(false);
  };

  return (
    <div className="">
      <div className="mx-auto flex max-w-2xl flex-col items-center p-4">
        <label className="mb-2 text-xl font-semibold">HenGPT</label>
        <div className="relative flex w-full items-center justify-center">
          <AnimatePresence>
            <motion.input
              key="input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả câu chuyện lãng mạn..."
              className="form-input h-10 rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
              initial={{ opacity: 0, width: "100%" }}
              animate={
                searchResult
                  ? {
                      opacity: 1,
                      width: "100%",
                      textAlign: "center",
                    }
                  : { width: "100%", opacity: 1 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              disabled={!!searchResult}
            />
            {!searchResult && (
              <motion.button
                className="absolute right-0 top-0 h-10 rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
                onClick={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                disabled={loading}
              >
                {loading ? "..." : <FaSearch />}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        {!submittedDescription && (
          <div className="relative mb-2 mt-2 flex h-8 w-full items-center justify-center">
            <AnimatePresence>
              {currentRecommendation && (
                <motion.div
                  key={currentRecommendation}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute cursor-pointer whitespace-break-spaces rounded bg-gray-200 px-3 py-1 text-sm text-gray-700"
                  onClick={() => {
                    setDescription(currentRecommendation);
                    setCurrentRecommendation(null);
                  }}
                >
                  {currentRecommendation}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {submittedDescription && (
        <div className="mt-4">
          <div className="mb-4">
            <h1 className="mb-2 text-lg font-semibold">Kết quả gợi ý</h1>
            <div className="text-sm">{explaination || "..."}</div>
            <div className="mt-2">
              <div className="text-sm">
                Các tag có thể liên quan:{" "}
                {searchResult ? searchResult.suggestedTags.join(", ") : "..."}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-2 h-40 w-full rounded object-cover"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.price}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TagSearch;

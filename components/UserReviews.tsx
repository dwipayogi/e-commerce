"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Review {
  id: number
  userId: number
  productId: number
  rating: number
  comment: string
  createdAt: string
}

// Dummy data
const dummyReviews: Review[] = [
  {
    id: 1,
    userId: 1,
    productId: 1,
    rating: 5,
    comment: "Great product! Highly recommended.",
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    userId: 2,
    productId: 1,
    rating: 4,
    comment: "Good quality, but a bit pricey.",
    createdAt: "2023-05-10",
  },
]

export default function UserReviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>(dummyReviews)
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" })

  const handleSubmitReview = () => {
    const review: Review = {
      id: reviews.length + 1,
      userId: Math.floor(Math.random() * 1000) + 1, // Generate a random user ID
      productId,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setReviews([review, ...reviews])
    setNewReview({ rating: 0, comment: "" })
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              onClick={() => setNewReview({ ...newReview, rating: star })}
            />
          ))}
        </div>
        <Textarea
          placeholder="Write your review here..."
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="mb-2"
        />
        <Button onClick={handleSubmitReview}>Submit Review</Button>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="ml-2 font-semibold">User {review.userId}</span>
              <span className="ml-2 text-gray-500 text-sm">{review.createdAt}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


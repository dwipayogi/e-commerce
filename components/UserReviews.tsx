"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
}

// This would typically come from your database
const getReviews = async (productId: string): Promise<Review[]> => {
  // Simulating an API call or database query
  return [
    {
      id: "1",
      userName: "John Doe",
      rating: 5,
      comment: "Great product! Highly recommended.",
      date: "2023-05-15",
    },
    {
      id: "2",
      userName: "Jane Smith",
      rating: 4,
      comment: "Good quality, but a bit pricey.",
      date: "2023-05-10",
    },
    // Add more reviews as needed
  ]
}

export default function UserReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" })

  useState(() => {
    getReviews(productId).then(setReviews)
  }, [productId])

  const handleSubmitReview = () => {
    // Here you would typically send the new review to your backend
    const review: Review = {
      id: String(reviews.length + 1),
      userName: "Current User", // In a real app, you'd get this from the authenticated user
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
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
              <span className="ml-2 font-semibold">{review.userName}</span>
              <span className="ml-2 text-gray-500 text-sm">{review.date}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


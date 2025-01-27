"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/app/context/AuthContext"

interface Review {
  id: number
  userId: number
  productId: number
  rating: number
  comment: string
  createdAt: Date
}

async function getReviews(productId: number): Promise<Review[]> {
  const response = await fetch(`/api/products/${productId}/reviews`)
  if (!response.ok) {
    throw new Error("Failed to fetch reviews")
  }
  return response.json()
}

async function submitReview(productId: number, rating: number, comment: string) {
  const response = await fetch(`/api/products/${productId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating, comment }),
  })
  if (!response.ok) {
    throw new Error("Failed to submit review")
  }
  return response.json()
}

export default function UserReviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" })
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews(productId)
        setReviews(fetchedReviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  const handleSubmitReview = async () => {
    if (!user) {
      alert("You must be logged in to submit a review")
      return
    }

    try {
      const review = await submitReview(productId, newReview.rating, newReview.comment)
      setReviews([review, ...reviews])
      setNewReview({ rating: 0, comment: "" })
    } catch (error) {
      console.error("Error submitting review:", error)
    }
  }

  if (isLoading) {
    return <div>Loading reviews...</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {user && (
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
      )}
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
              <span className="ml-2 text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


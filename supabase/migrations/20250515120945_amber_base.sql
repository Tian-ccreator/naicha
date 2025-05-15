/*
  # Create reviews and ratings tables

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `tea_id` (text, references product ID)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `created_at` (timestamp)
    
  2. Security
    - Enable RLS on `reviews` table
    - Add policies for authenticated users to:
      - Read all reviews
      - Create their own reviews
      - Update their own reviews
      - Delete their own reviews
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  tea_id text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tea_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews
  FOR SELECT
  USING (true);

-- Allow authenticated users to create reviews
CREATE POLICY "Users can create their own reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own reviews
CREATE POLICY "Users can update their own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
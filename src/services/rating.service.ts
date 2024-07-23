import { IRating } from "@interfaces";
import { Rating } from "@models";

class RatingService {
  // CreateRating :one
  public createRating(rating: IRating): Promise<Rating> {
    return Rating.create(rating);
  }

  // GetRating :one
  public getRating(rating: IRating): Promise<Rating> {
    return Rating.findByPk(rating.id);
  }

  // ListRatings :many
  public listRatings(): Promise<Rating[]> {
    return Rating.findAll();
  }

  // UpdateRating :one
  public updateRating(rating: Rating, updates: IRating): Promise<Rating> {
    rating.update({ ...updates });
    return rating.save();
  }
}

export default RatingService;

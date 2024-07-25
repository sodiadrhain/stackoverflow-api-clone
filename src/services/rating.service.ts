import { IRating, IReplyRating } from "@interfaces";
import { Rating } from "@models";
import ReplyRating from "src/models/reply-rating.model";

class RatingService {
  // Start Question Ratings

  // CreateQuestionRating :one
  public createQuestionRating(rating: IRating): Promise<Rating> {
    return Rating.create(rating);
  }

  // GetQuestionRating :one
  public getQuestionRating(rating: IRating): Promise<Rating> {
    return Rating.findOne({ where: { ...rating } });
  }

  // GetQuestionRatingCount :one
  public getQuestionRatingCount(rating: IRating): Promise<{ rows: Rating[]; count: number }> {
    return Rating.findAndCountAll({ where: { ...rating } });
  }

  // ListQuestionRatings :many
  public listQuestionRatings(): Promise<Rating[]> {
    return Rating.findAll();
  }

  // UpdateQuestionRating :one
  public updateQuestionRating(rating: Rating, updates: IRating): Promise<Rating> {
    rating.update({ ...updates });
    return rating.save();
  }

  // End Question Ratings

  // Start Reply Ratings

  // CreateReplyRating :one
  public createReplyRating(rating: IReplyRating): Promise<ReplyRating> {
    return ReplyRating.create(rating);
  }

  // GetReplyRating :one
  public getReplyRating(rating: IReplyRating): Promise<ReplyRating> {
    return ReplyRating.findOne({ where: { ...rating } });
  }

  // GetReplyRatingCount :one
  public getReplyRatingCount(
    rating: IReplyRating
  ): Promise<{ rows: ReplyRating[]; count: number }> {
    return ReplyRating.findAndCountAll({ where: { replyId: rating.replyId } });
  }

  // ListReplyRatings :many
  public listReplyRatings(): Promise<IReplyRating[]> {
    return ReplyRating.findAll();
  }

  // UpdateReplyRating :one
  public updateReplyRating(rating: ReplyRating, updates: IReplyRating): Promise<ReplyRating> {
    rating.update({ ...updates });
    return rating.save();
  }

  // End Reply Ratings
}

export default RatingService;

import { db } from "@config";
import { IReply, IPaginationOptions } from "@interfaces";
import { Question, Reply, Subscription, SubscriptionNotification } from "@models";
import { Op } from "sequelize";

class ReplyService {
  // CreateReply :one
  public createReply(reply: IReply): Promise<Reply> {
    return Reply.create(reply);
  }

  // GetReply :one
  public getReply(reply: IReply): Promise<Reply> {
    return Reply.findByPk(reply.id);
  }

  // ListReplys :many
  public listReplys(arg: IPaginationOptions<IReply>): Promise<{ rows: Reply[]; count: number }> {
    return Reply.findAndCountAll({
      where: { ...arg.query },
      limit: arg.limit,
      offset: arg.limit * (arg.page - 1),
      order: [["id", "DESC"]],
    });
  }

  // UpdateReply :one
  public updateReply(reply: Reply, updates: IReply): Promise<Reply> {
    reply.update({ ...updates });
    return reply.save();
  }

  // DeleteReply :one
  public deleteReply(reply: IReply): Promise<number> {
    return Reply.destroy({ where: { id: reply.id }, cascade: true });
  }

  // CreateReplyTx :one
  public async createReplyTx(reply: IReply, question: Question): Promise<Reply> {
    let newReply: Reply;
    return db.transaction(async () => {
      // create a new reply with transaction
      // checks the subscrition table for all users who are subscribed to the question
      // creates a notification for each of the subscribed user
      // TODO: After create reply ==> send email to user
      newReply = await Reply.create(reply);
      const questionId = question.id;

      // do not create notification if its owner of question making reply
      const subscriptions = await Subscription.findAll({
        where: { questionId, userId: { [Op.ne]: question.userId } },
        lock: true,
      });

      // notify the question owner
      await SubscriptionNotification.create({
        questionId,
        userId: question.userId,
        replyId: newReply.id,
      });

      // notify subscribers of the question
      subscriptions.forEach(async (s) => {
        // also if user who is making the reply already subscribed to it do not notify
        if (reply.userId === s.userId) {
          return;
        }
        await SubscriptionNotification.create({
          questionId,
          userId: s.userId,
          replyId: newReply.id,
        });
      });

      // QUEUE: Log notification to send via email to user
      return Promise.resolve(newReply);
    });
  }
}

export default ReplyService;

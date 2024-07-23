import { IReply } from "@interfaces";
import { Reply } from "@models";
import { IPaginationOptions } from "src/interfaces/pagination.interface";

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
}

export default ReplyService;

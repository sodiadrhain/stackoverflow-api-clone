import { IReply } from "@interfaces";
import { Reply } from "@models";

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
  public listReplys(): Promise<Reply[]> {
    return Reply.findAll();
  }

  // UpdateReply :one
  public updateReply(reply: Reply, updates: IReply): Promise<Reply> {
    reply.update({ ...updates });
    return reply.save();
  }
}

export default ReplyService;

import { ISubscriptionNotification } from "@interfaces";
import { SubscriptionNotification } from "@models";
import { IPaginationOptions } from "src/interfaces/pagination.interface";

class SubscriptionNotificationService {
  // CreateSN:one
  public createSn(sn: ISubscriptionNotification): Promise<SubscriptionNotification> {
    return SubscriptionNotification.create(sn);
  }

  // GetSN :one
  public getSn(sn: ISubscriptionNotification): Promise<SubscriptionNotification> {
    return SubscriptionNotification.findOne({
      where: { ...sn },
    });
  }

  // ListSNs :many
  public listSns(
    arg: IPaginationOptions<ISubscriptionNotification>
  ): Promise<{ rows: SubscriptionNotification[]; count: number }> {
    return SubscriptionNotification.findAndCountAll({
      where: { ...arg.query },
      limit: arg.limit,
      offset: arg.limit * (arg.page - 1),
      order: [["id", "DESC"]],
    });
  }

  // UpdateSN :one
  public updateSn(
    sn: SubscriptionNotification,
    updates: ISubscriptionNotification
  ): Promise<SubscriptionNotification> {
    sn.update({ ...updates });
    return sn.save();
  }
}

export default SubscriptionNotificationService;

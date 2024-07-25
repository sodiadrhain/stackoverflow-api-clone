import { ISubscription } from "@interfaces";
import { Question, Subscription } from "@models";

class SubscriptionService {
  // CreateSubscription :one
  public createSubscription(subsciption: ISubscription): Promise<Subscription> {
    return Subscription.create(subsciption);
  }

  // GetSubscription :one
  public getSubscription(subsciption: ISubscription): Promise<Subscription> {
    return Subscription.findOne({
      where: { ...subsciption },
      include: [{ model: Question, as: "question" }],
    });
  }

  // ListSubscriptions :many
  public listSubscriptions(): Promise<Subscription[]> {
    return Subscription.findAll();
  }

  // UpdateSubscription :one
  public updateSubscription(
    subsciption: Subscription,
    updates: ISubscription
  ): Promise<Subscription> {
    subsciption.update({ ...updates });
    return subsciption.save();
  }
}

export default SubscriptionService;

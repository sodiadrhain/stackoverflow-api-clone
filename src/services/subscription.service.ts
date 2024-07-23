import { ISubscription } from "@interfaces";
import { Subscription } from "@models";

class SubscriptionService {
  // CreateSubscription :one
  public createSubscription(subsciption: ISubscription): Promise<Subscription> {
    return Subscription.create(subsciption);
  }

  // GetSubscription :one
  public getSubscription(subsciption: ISubscription): Promise<Subscription> {
    return Subscription.findByPk(subsciption.id);
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
    return subsciption.update({ ...updates });
  }
}

export default SubscriptionService;

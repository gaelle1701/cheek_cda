import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from "typeorm";
import { Price } from "../entities/Price";

@EventSubscriber()
export class PriceSubscriber implements EntitySubscriberInterface<Price>  {
    listenTo() {
        return Price;
    }

    // async beforeUpdate(event: UpdateEvent<Price>) {
        
    //     const priceRepository = event.manager.getRepository(Price)
    //     const updatedPrice = await priceRepository.findOneBy({id: event.entity.id});

    //     updatedPrice.price_ttc = event.entity.price_ht + event.entity.price_ht * 0.20;
        
    //     return await priceRepository.save(updatedPrice);
    // }

}
import { Client } from "../../../../domain/entity/client";
import { Mapper } from "../../../mapper/maper";

export class ClientMapper implements Mapper<Client> {
    toDomain(target: any): Client {
        throw new Error("Method not implemented.");
    }
    toEntityOrm(target: Client) {
        throw new Error("Method not implemented.");
    }
    toPersister(target: Client) {
        throw new Error("Method not implemented.");
    }
}
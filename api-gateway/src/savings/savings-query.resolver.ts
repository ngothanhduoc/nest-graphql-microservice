import { Inject, OnModuleInit, UseGuards } from "@nestjs/common";
import { ClientGrpcProxy } from "@nestjs/microservices";
import { Query, Resolver, Args } from "@nestjs/graphql";

import { isEmpty, merge } from "lodash";
import { PinoLogger } from "nestjs-pino";

import { ISavingsService } from "./savings.interface";
import { User, SavingsConnection } from "../graphql/typings";

import { QueryUtils } from "../utils/query.utils";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { CurrentUser } from "../auth/user.decorator";

@Resolver("Saving")
export class SavingsQueryResolver implements OnModuleInit {
  constructor(
    @Inject("SavingsServiceClient")
    private readonly savingsServiceClient: ClientGrpcProxy,

    private readonly queryUtils: QueryUtils,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(SavingsQueryResolver.name);
  }

  private savingsService: ISavingsService;

  onModuleInit(): void {
    this.savingsService = this.savingsServiceClient.getService<ISavingsService>(
      "SavingsService"
    );
  }
}

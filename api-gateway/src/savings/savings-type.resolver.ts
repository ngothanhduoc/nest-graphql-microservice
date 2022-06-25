import { Inject, OnModuleInit } from "@nestjs/common";
import { ClientGrpcProxy } from "@nestjs/microservices";
import { Resolver, Args, Parent, ResolveField } from "@nestjs/graphql";

import { isEmpty, merge } from "lodash";
import { PinoLogger } from "nestjs-pino";

import { QueryUtils } from "../utils/query.utils";

@Resolver("Saving")
export class SavingsTypeResolver implements OnModuleInit {
  constructor(
    private readonly queryUtils: QueryUtils,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(SavingsTypeResolver.name);
  }

  onModuleInit(): void {}
}

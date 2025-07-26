import { createLoader, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { MeetingStatus } from "~/lib/type";

export const filterSeachParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(Object.values(MeetingStatus)),
  agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(filterSeachParams);

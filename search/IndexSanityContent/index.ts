import { AzureFunction, Context, HttpRequest, Logger } from '@azure/functions';
import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import * as O from 'fp-ts/Option';
import { Language, languageOrDefault } from '../common';
import { loadEnv } from '../common/env';
import { indexEvents } from './events';
import { indexLocalNews } from './localNews';
import { indexMagazine } from './magazine';
import { indexNews } from './news';
import { indexTopic } from './topic';

const indexes = ['EVENTS', 'TOPICS', 'MAGAZINE', 'NEWS', 'LOCALNEWS'];

const indexTasks: {
  [key: string]: (
    language: Language,
    logger: Logger,
  ) => (docId: string) => T.Task<number[]>;
} = {
  EVENTS: indexEvents,
  MAGAZINE: indexMagazine,
  NEWS: indexNews,
  LOCALNEWS: indexLocalNews,
  TOPICS: indexTopic,
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const logger = context.log;
  logger.info(JSON.stringify(req.body));
  await loadEnv(logger);

  const language = languageOrDefault(req.body.language);

  const getIndex = pipe(
    req.body?.index as string[],
    E.fromNullable('no index specified'),
    E.getOrElse(() => indexes),
  );

  const getDocId = pipe(
    O.fromNullable(req.body?.docToClear),
    O.getOrElse(() => 'no id'),
  );

  const clearIndex = (index: string) =>
    pipe(
      TE.tryCatch(
        () => indexTasks[index](language, logger)(getDocId)(),
        (err) => {
          logger.error(err);
          return `Error indexing ${index}`;
        },
      ),
      TE.toUnion,
    );
  const run = pipe(
    T.of(getIndex),
    T.flatMap((indexes) => A.traverse(T.ApplicativePar)(clearIndex)(indexes)),
  );
  const result = await run();
  context.res = {
    status: 200 /* The status defaults to 200 OK if not specified */,
    body: result.flat(),
  };
};
export default httpTrigger;

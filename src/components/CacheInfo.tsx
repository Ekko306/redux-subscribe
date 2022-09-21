import { useAppSelector } from "../storeHooks";
import { css } from "@emotion/css";

const classes = {
  container: css`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    > *:not(:last-of-type) {
      margin-right: 16px;
    }
    > * {
      width: 450px;
      border: 1px solid black;
      padding: 16px;
    }
    pre {
      text-align: left;
    }
  `
};

export function CacheInfo() {
  const queries = useAppSelector((state) => state.api.queries);
  const mutations = useAppSelector((state) => state.api.mutations);
  const subscriptions = useAppSelector((state) => state.api.subscriptions);

  const subscribers = subscriptions["getUsers(3)"];
  const subscriberReferenceCount = subscribers
    ? Object.keys(subscribers).length
    : 0;

  return (
    <div className={classes.container}>
      <div>
        <h4>Subscriptions</h4>
        <div>Subscriber reference count: {subscriberReferenceCount}</div>
        <div>
          <pre>{JSON.stringify(subscriptions, null, 4)}</pre>
        </div>
      </div>
      <div>
        <h4>Queries</h4>
        <div>
          <pre>{JSON.stringify(queries, null, 4)}</pre>
        </div>
      </div>
      <div>
        <h4>Mutations</h4>
        <div>
          <pre>{JSON.stringify(mutations, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}

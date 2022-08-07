import Loading from "./Load";
import ErrorMessage from "./Error";

export default function ErrLoadChain({ comp, err, loading }) {
  const NestedComponent = comp;
  return (
    <div>{!err ? loading ? <Loading /> : <NestedComponent /> : <ErrorMessage />}</div>
  );
}

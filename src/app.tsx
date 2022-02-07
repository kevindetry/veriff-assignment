import { useCallback, useEffect, useState } from "react";
import {
  fetchChecks,
  submitCheckResults,
  type Check,
  type CheckResult,
} from "./api";
import CheckListForm from "./components/check-list-form";

const App = () => {
  const [checks, setChecks] = useState<Check[]>();

  const loadChecks = useCallback(async () => {
    try {
      setChecks(await fetchChecks());
    } catch (error) {
      void loadChecks();
    }
  }, []);

  const handleSubmit = useCallback(async (values: CheckResult[]) => {
    try {
      await submitCheckResults(values);
      alert("Successfully submitted!");
    } catch (error) {
      await handleSubmit(values);
    }
  }, []);

  useEffect(() => void loadChecks(), [loadChecks]);

  return !checks ? (
    <div>Loading...</div>
  ) : (
    <CheckListForm checks={checks} onSubmit={handleSubmit} />
  );
};

export default App;

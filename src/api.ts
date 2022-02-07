export interface Check {
  id: string;
  priority: number;
  description: string;
}

export interface CheckResult {
  checkId: string;
  value: "yes" | "no";
}

export const mockChecks: Check[] = [
  {
    id: "aaa",
    priority: 10,
    description: "Face on the picture matches face on the document",
  },
  {
    id: "bbb",
    priority: 5,
    description: "Veriff supports presented document",
  },
  {
    id: "ccc",
    priority: 7,
    description: "Face is clearly visible",
  },
  {
    id: "ddd",
    priority: 3,
    description: "Document data is clearly visible",
  },
];

export const fetchChecks = () =>
  new Promise<Check[]>((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() <= 0.8 ? resolve(mockChecks) : reject({ success: false }),
      500
    )
  );

/**
 * @param results - The list of check results
 */
export const submitCheckResults = (results: CheckResult[]) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() <= 0.8 ? resolve(results) : reject({ success: false }),
      500
    )
  );
